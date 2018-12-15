package game

import "time"

// State is a snapshot of the game state as a whole
type State struct {
	PaddleLeft  Paddle
	PaddleRight Paddle
}

// Step will update the game state for the given duration
func (s *State) Step(d time.Duration) {
	s.PaddleLeft.Step(d)
	s.PaddleRight.Step(d)
}
