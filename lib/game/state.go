package game

import (
	"time"
)

// State is a snapshot of the game state as a whole
type State struct {
	PaddleLeft  *Paddle `json:"pL"`
	PaddleRight *Paddle `json:"pR"`

	Ball *Ball `json:"b"`
}

// New creates a fresh game state ready to play
func New(cfg Config) *State {
	return &State{
		PaddleLeft: &Paddle{
			Center: 0.5,
			Height: cfg.PaddleHeight,
			Speed:  0,
		},
		PaddleRight: &Paddle{
			Center: 0.5,
			Height: cfg.PaddleHeight,
			Speed:  0,
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
func (s *State) Step(d time.Duration) {
	s.PaddleLeft.Step(d)
	s.PaddleRight.Step(d)

	s.Ball.Step(d, s.PaddleLeft, s.PaddleRight)
}
