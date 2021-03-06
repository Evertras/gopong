package play

import (
	"errors"
	"time"

	"github.com/Evertras/gopong/lib/state"
	"github.com/Evertras/gopong/lib/store"
	gopongmsg "github.com/Evertras/gopong/messages/gomessage"
)

// State is a snapshot of the game state as a whole
type State struct {
	PaddleLeft  Paddle
	PaddleRight Paddle

	Ball Ball
}

// New creates a fresh game state ready to play
func New(cfg store.Config) *State {
	return &State{
		PaddleLeft: Paddle{
			Center:            0.5,
			Height:            cfg.PaddleHeight,
			Width:             cfg.PaddleWidth,
			MaxSpeedPerSecond: cfg.MaxPaddleSpeedPerSecond,
		},
		PaddleRight: Paddle{
			Center:            0.5,
			Height:            cfg.PaddleHeight,
			Width:             cfg.PaddleWidth,
			MaxSpeedPerSecond: cfg.MaxPaddleSpeedPerSecond,
		},
		Ball: Ball{
			PosX:   0.5,
			PosY:   0.5,
			VelX:   0.15,
			VelY:   0.03,
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
func (s *State) ApplyInput(i gopongmsg.Input, side gopongmsg.Config_PaddleSide) {
	var paddle *Paddle

	if side == gopongmsg.Config_SIDE_LEFT {
		paddle = &s.PaddleLeft
	} else {
		paddle = &s.PaddleRight
	}

	paddle.Center += float64(i.MovementAxis*i.DurationSeconds) * s.PaddleLeft.MaxSpeedPerSecond
	paddle.Bound()
}

// Marshal creates a state message of this play state to send to clients
func (s *State) Marshal(msg *gopongmsg.State) error {
	if msg == nil {
		return errors.New("Received nil message in play Marshal")
	}

	msg.Type = gopongmsg.State_STATE_PLAY
	msg.Current = &gopongmsg.State_Play_{
		Play: &gopongmsg.State_Play{
			PaddleLeft: &gopongmsg.State_Play_Paddle{
				Center: float32(s.PaddleLeft.Center),
			},
			PaddleRight: &gopongmsg.State_Play_Paddle{
				Center: float32(s.PaddleRight.Center),
			},
			Ball: &gopongmsg.State_Play_Ball{
				CenterX: float32(s.Ball.PosX),
				CenterY: float32(s.Ball.PosY),
			},
		},
	}

	return nil
}
