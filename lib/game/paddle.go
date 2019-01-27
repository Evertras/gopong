package game

import "time"

// Paddle describes the current state of a paddle
type Paddle struct {
	Center float64 `json:"c"`
	Speed  float64 `json:"s"`
	Height float64 `json:"-"`
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
