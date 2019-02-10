package starting

import (
	"time"

	"github.com/Evertras/gopong/lib/message"
	"github.com/Evertras/gopong/lib/state"
	"github.com/Evertras/gopong/lib/state/play"
	"github.com/Evertras/gopong/lib/store"
)

// State represents the Starting state where a countdown occurs
type State struct {
	RemainingMilliseconds int `json:"r"`

	cfg *store.Config
}

// New creates a new starting state that will wait for the specified amount of time before advancing
func New(cfg *store.Config, duration time.Duration) *State {
	return &State{
		RemainingMilliseconds: int(duration.Seconds() * 1000),
		cfg:                   cfg,
	}
}

// Step advances the time we're waiting for
func (s *State) Step(delta time.Duration) state.State {
	s.RemainingMilliseconds -= int(delta.Seconds() * 1000)

	if s.RemainingMilliseconds <= 0 {
		return play.New(s.cfg)
	}

	return s
}

// Marshal will tell the client how much time is remaining
func (s *State) Marshal() (message.State, error) {
	msg := message.State{
		Type: message.StateStarting,
		Data: s,
	}

	return msg, nil
}

// ApplyInput does nothing for this state, no one can do anything while waiting for the count down
func (s *State) ApplyInput(_ message.Input, _ message.PlayerSide) {}
