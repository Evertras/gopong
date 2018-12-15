package game

import "time"

// PaddleSide is 1 for left, 2 for right
type PaddleSide int

const (
	// PaddleLeft is the integer used for the left paddle
	PaddleLeft PaddleSide = 1

	// PaddleRight is the integer used for the right paddle
	PaddleRight PaddleSide = 1
)

// Paddle describes the current state of a paddle
type Paddle struct {
	Side   PaddleSide `json:"p"`
	Center float64    `json:"c"`
	Speed  float64    `json:"s"`
	Height float64    `json:"h"`
}

// Step will update the paddle's state for the given duration, bounding the paddle to the play area
func (p *Paddle) Step(d time.Duration) {
	p.Center += p.Speed * d.Seconds()
	halfHeight := p.Height * 0.5

	if p.Speed > 0 {
		if p.Center+halfHeight > 1 {
			p.Center = 1 - halfHeight
		}
	} else if p.Speed < 0 {
		if p.Center-halfHeight < 0 {
			p.Center = halfHeight
		}
	}
}
