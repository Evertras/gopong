package starting

import (
	"errors"
	"time"

	"github.com/Evertras/gopong/lib/state"
	"github.com/Evertras/gopong/lib/state/play"
	"github.com/Evertras/gopong/lib/store"
	gopongmsg "github.com/Evertras/gopong/messages/gomessage"
)

// State represents the Starting state where a countdown occurs
type State struct {
	Remaining time.Duration

	cfg store.Config
}

// New creates a new starting state that will wait for the specified amount of time before advancing
func New(cfg store.Config, duration time.Duration) *State {
	return &State{
		Remaining: duration,
		cfg:       cfg,
	}
}

// Step advances the time we're waiting for
func (s *State) Step(delta time.Duration) state.State {
	s.Remaining -= delta

	if s.Remaining <= 0 {
		return play.New(s.cfg)
	}

	return s
}

// Marshal will tell the client how much time is remaining
func (s *State) Marshal(msg *gopongmsg.Server_State) error {
	if msg == nil {
		return errors.New("Received nil message in starting state Marshal")
	}
	msg.Type = gopongmsg.Server_State_STATE_START

	msg.State = &gopongmsg.Server_State_Start_{
		Start: &gopongmsg.Server_State_Start{
			SecondsRemaining: float32(s.Remaining.Seconds()),
		},
	}

	return nil
}

// ApplyInput does nothing for this state, no one can do anything while waiting for the count down
func (s *State) ApplyInput(_ gopongmsg.Client_Input, _ gopongmsg.Server_Config_PaddleSide) {}
