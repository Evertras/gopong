package message

// ConfigInner holds the actual config data
type ConfigInner struct {
	PaddleHeight            float64    `json:"paddleHeight"`
	BallRadius              float64    `json:"ballRadius"`
	MaxPaddleSpeedPerSecond float64    `json:"paddleMaxSpeedPerSecond"`
	PaddleSide              PlayerSide `json:"side"`
}

// Config is a message sent to the client to define the game's config
type Config struct {
	Config ConfigInner `json:"config"`
}
