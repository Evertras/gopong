package instance

import (
	"log"
	"time"

	"github.com/Evertras/gopong/lib/client"
	"github.com/Evertras/gopong/lib/state"
	"github.com/Evertras/gopong/lib/state/play"
	metrics "github.com/armon/go-metrics"
)

var metricKeyGameLoopActive = []string{"game", "loop", "active"}

// Instance is a game instance that controls the game state machine
type Instance struct {
	cfg          Config
	currentState state.State
	clientLeft   *client.Client
	clientRight  *client.Client
}

// Config contains all config information about the game to start
type Config struct {
	Play         play.Config
	StepInterval time.Duration
}

// New returns a new instance that is ready to start, but isn't started yet
func New(cfg Config, left *client.Client, right *client.Client) *Instance {
	i := &Instance{
		cfg:          cfg,
		currentState: play.New(cfg.Play),
		clientLeft:   left,
		clientRight:  right,
	}

	return i
}

// Run starts the game and runs until completion
func (i *Instance) Run() {
	ticker := time.NewTicker(i.cfg.StepInterval)
	defer ticker.Stop()
	d := time.Now()
	startTime := d

	defer func() {
		i.clientLeft.Close()
		i.clientRight.Close()
	}()

	for {
		select {
		case <-ticker.C:
			startTime = time.Now()
			stepDelta := time.Since(d)

			i.processInputs()
			i.currentState.Step(stepDelta)

			stateMessage, err := i.currentState.Marshal()

			if err != nil {
				log.Println("Error marshaling state:", err)
				return
			}

			if err := i.clientLeft.WriteState(stateMessage); err != nil {
				log.Println("Error writing state to left client:", err)
				return
			}

			if err := i.clientLeft.WriteState(stateMessage); err != nil {
				log.Println("Error writing state to right client:", err)
				return
			}

			d = time.Now()

			metrics.MeasureSince(metricKeyGameLoopActive, startTime)
		}
	}
}

func (i *Instance) processInputs() {
	inputsLeft := i.clientLeft.FlushInputs()

	for range inputsLeft {
		//i.State.ApplyInput(i)
	}

	inputsRight := i.clientRight.FlushInputs()

	for range inputsRight {
		//i.State.ApplyInput(i)
	}
}
