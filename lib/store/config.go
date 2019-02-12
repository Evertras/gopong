package store

import "time"

// Config contains all persistent settings for a game's lifetime
type Config struct {
	// Things that will be sent to the client
	PaddleHeight            float64 `json:"paddleHeight"`
	PaddleWidth             float64 `json:"paddleWidth"`
	BallRadius              float64 `json:"ballRadius"`
	MaxPaddleSpeedPerSecond float64 `json:"paddleMaxSpeedPerSecond"`

	// Things for internal use
	StepInterval time.Duration `json:"-"`
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
