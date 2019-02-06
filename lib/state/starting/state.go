package starting

import (
	"encoding/json"
	"time"

	"github.com/Evertras/gopong/lib/state"
	"github.com/Evertras/gopong/lib/state/message"
	"github.com/Evertras/gopong/lib/state/play"
	"github.com/Evertras/gopong/lib/store"
)

// State represents the Starting state where a countdown occurs
type State struct {
	Remaining time.Duration `json:"r"`

	cfg *store.Config
}

// New creates a new starting state that will wait for the specified amount of time before advancing
func New(cfg *store.Config, duration time.Duration) *State {
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
func (s *State) Marshal() (message.State, error) {
	data, err := json.Marshal(s)

	if err != nil {
		return message.State{}, err
	}

	msg := message.State{
		Type: message.StateStarting,
		Data: string(data),
	}

	return msg, nil
}

// ApplyInput does nothing for this state, no one can do anything while waiting for the count down
func (s *State) ApplyInput(_ message.Input, _ message.PlayerSide) {}
