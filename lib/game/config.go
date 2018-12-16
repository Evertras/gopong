package game

// Config contains all configuration for a game to start
type Config struct {
	PaddleHeight float64 `json:"paddleHeight"`
	BallRadius   float64 `json:"ballRadius"`
}
