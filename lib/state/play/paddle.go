package play

// Paddle describes the current state of a paddle
type Paddle struct {
	Center            float64 `json:"c"`
	Height            float64 `json:"-"`
	MaxSpeedPerSecond float64 `json:"-"`
}

// Bound will ensure that the paddle stays within the playfield
func (p *Paddle) Bound() {
	halfHeight := p.Height * 0.5

	if p.Center+halfHeight > 1 {
		p.Center = 1 - halfHeight
	}

	if p.Center-halfHeight < 0 {
		p.Center = halfHeight
	}
}
