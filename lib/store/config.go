package store

import "time"

// Config contains all persistent settings for a game's lifetime
type Config struct {
	// Things that will be sent to the client
	PaddleHeight            float64
	BallRadius              float64
	MaxPaddleSpeedPerSecond float64

	// Things for internal use
	StepInterval time.Duration
}

// New returns a new config store with some default values set
func New() *Config {
	// Some defaults
	return &Config{
		PaddleHeight:            0.20,
		BallRadius:              0.01,
		MaxPaddleSpeedPerSecond: 0.05,
	}
}