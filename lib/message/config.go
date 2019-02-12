package message

// ConfigInner holds the actual config data
type ConfigInner struct {
	PaddleHeight            float64    `json:"paddleHeight"`
	BallRadius              float64    `json:"ballRadius"`
	MaxPaddleSpeedPerSecond float64    `json:"paddleMaxSpeedPerSecond"`
	PaddleSide              PlayerSide `json:"side" tstype:"ServerPaddleSide"`
}

// Config is a message sent to the client to define the game's config.
// It's wrapped in an inner structure to avoid JSON key collisions in the root.
type Config struct {
	Config ConfigInner `json:"config"`
}
