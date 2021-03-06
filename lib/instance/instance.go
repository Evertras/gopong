package instance

import (
	"log"
	"time"

	gopongmsg "github.com/Evertras/gopong/messages/gomessage"

	"github.com/Evertras/gopong/lib/client"
	"github.com/Evertras/gopong/lib/state"
	"github.com/Evertras/gopong/lib/state/starting"
	"github.com/Evertras/gopong/lib/store"
	metrics "github.com/armon/go-metrics"
)

var metricKeyGameLoopActive = []string{"game", "loop", "active"}
var metricKeyCounterInputInvalid = []string{"game", "input", "invalid"}
var metricKeyReceivedInputDuration = []string{"game", "input", "duration", "seconds"}

// Instance is a game instance that controls the game state machine
type Instance struct {
	cfg          store.Config
	currentState state.State
	clientLeft   *client.Client
	clientRight  *client.Client
}

// New returns a new instance that is ready to start, but isn't started yet
func New(cfg store.Config, left *client.Client, right *client.Client) *Instance {
	i := &Instance{
		cfg:          cfg,
		currentState: starting.New(cfg, time.Second*3),
		clientLeft:   left,
		clientRight:  right,
	}

	return i
}

// Run starts the game and runs until completion
func (i *Instance) Run() {
	ticker := time.NewTicker(i.cfg.StepInterval)
	defer ticker.Stop()
	lastTime := time.Now()
	startTime := lastTime

	defer func() {
		i.clientLeft.Close()
		i.clientRight.Close()
	}()

	if err := i.clientLeft.WriteConfig(i.cfg, gopongmsg.Config_SIDE_LEFT); err != nil {
		log.Println("Error writing config to left client", err)
		return
	}

	if err := i.clientRight.WriteConfig(i.cfg, gopongmsg.Config_SIDE_RIGHT); err != nil {
		log.Println("Error writing config to right client", err)
		return
	}

	for {
		select {
		case <-ticker.C:
			startTime = time.Now()
			stepDelta := time.Since(lastTime)

			i.processInputs()
			i.currentState = i.currentState.Step(stepDelta)

			stateMessage := gopongmsg.State{}

			err := i.currentState.Marshal(&stateMessage)

			if err != nil {
				log.Println("Error marshaling state:", err)
				return
			}

			if err := i.clientLeft.WriteState(stateMessage); err != nil {
				log.Println("Error writing state to left client:", err)
				return
			}

			if err := i.clientRight.WriteState(stateMessage); err != nil {
				log.Println("Error writing state to right client:", err)
				return
			}

			lastTime = time.Now()

			metrics.MeasureSince(metricKeyGameLoopActive, startTime)
		}
	}
}

func (i *Instance) processInputs() {
	inputsLeft := i.clientLeft.FlushInputs()

	for _, input := range inputsLeft {
		// TODO: More sanity checks for cheating, check for accumulated time to avoid spamming
		// input, etc.

		if input.MovementAxis > 1 || input.MovementAxis < -1 || input.DurationSeconds > 0.1 {
			metrics.IncrCounter(metricKeyCounterInputInvalid, 1)
			break
		}

		metrics.AddSample(metricKeyReceivedInputDuration, float32(input.DurationSeconds))

		i.currentState.ApplyInput(input, gopongmsg.Config_SIDE_LEFT)
	}

	inputsRight := i.clientRight.FlushInputs()

	for _, input := range inputsRight {
		// TODO: More sanity checks for cheating, check for accumulated time to avoid spamming
		// input, etc.

		if input.MovementAxis > 1 || input.MovementAxis < -1 || input.DurationSeconds > 0.1 {
			metrics.IncrCounter(metricKeyCounterInputInvalid, 1)
			break
		}

		metrics.AddSample(metricKeyReceivedInputDuration, float32(input.DurationSeconds))

		i.currentState.ApplyInput(input, gopongmsg.Config_SIDE_RIGHT)
	}
}
