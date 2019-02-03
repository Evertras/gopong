package play

import (
	"encoding/json"
	"time"

	"github.com/Evertras/gopong/lib/state"
	"github.com/Evertras/gopong/lib/state/message"
	metrics "github.com/armon/go-metrics"
)

// State is a snapshot of the game state as a whole
type State struct {
	PaddleLeft  *Paddle `json:"pL"`
	PaddleRight *Paddle `json:"pR"`

	Ball *Ball `json:"b"`
}

var sampleKeyReceivedInputDuration = []string{"game", "input", "duration", "seconds"}
var counterInputInvalid = []string{"game", "input", "invalid"}

// New creates a fresh game state ready to play
func New(cfg Config) *State {
	return &State{
		PaddleLeft: &Paddle{
			Center:            0.5,
			Height:            cfg.PaddleHeight,
			MaxSpeedPerSecond: cfg.MaxPaddleSpeedPerSecond,
		},
		PaddleRight: &Paddle{
			Center:            0.5,
			Height:            cfg.PaddleHeight,
			MaxSpeedPerSecond: cfg.MaxPaddleSpeedPerSecond,
		},
		Ball: &Ball{
			PosX:   0.5,
			PosY:   0.5,
			VelX:   0.05,
			VelY:   0.1,
			Radius: cfg.BallRadius,
		},
	}
}

// Step will update the game state for the given duration
func (s *State) Step(d time.Duration) state.State {
	s.Ball.Step(d, s.PaddleLeft, s.PaddleRight)

	return s
}

// ApplyInput applies a given input to the state
func (s *State) ApplyInput(i message.Input, side message.PlayerSide) {
	metrics.AddSample(sampleKeyReceivedInputDuration, float32(i.DurationSeconds))

	// TODO: More sanity checks for cheating, check for accumulated time to avoid spamming
	// input, etc.

	if i.MovementAxis > 1 || i.MovementAxis < -1 || i.DurationSeconds > 0.1 {
		metrics.IncrCounter(counterInputInvalid, 1)
		return
	}

	var paddle *Paddle

	if side == message.PlayerSideLeft {
		paddle = s.PaddleLeft
	} else {
		paddle = s.PaddleRight
	}

	paddle.Center += i.MovementAxis * i.DurationSeconds * s.PaddleLeft.MaxSpeedPerSecond
	paddle.Bound()
}

// Marshal creates a state message of this play state to send to clients
func (s *State) Marshal() (message.State, error) {
	msg, err := json.Marshal(s)

	if err != nil {
		return message.State{}, err
	}

	return message.State{
		Data: string(msg),
		Type: message.StatePlay,
	}, nil
}
