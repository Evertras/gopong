package store

import "time"

// Config contains all persistent settings for a game's lifetime
type Config struct {
	PaddleHeight            float64
	PaddleWidth             float64
	BallRadius              float64
	MaxPaddleSpeedPerSecond float64
	StepInterval            time.Duration
}

// New returns a new config store with some default values set
func New() Config {
	// Some defaults
	return Config{
		PaddleHeight:            0.20,
		PaddleWidth:             0.03,
		BallRadius:              0.01,
		MaxPaddleSpeedPerSecond: 0.05,

		StepInterval: time.Millisecond * 100,
	}
}
