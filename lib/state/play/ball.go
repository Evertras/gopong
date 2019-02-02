package play

import "time"

// Ball represents the ball with a position, size, and velocity
type Ball struct {
	PosX float64 `json:"x"`
	PosY float64 `json:"y"`

	VelX float64 `json:"-"`
	VelY float64 `json:"-"`

	Radius float64 `json:"-"`
}

// Step moves the ball, bouncing off the ceiling, floor, and paddles
func (b *Ball) Step(d time.Duration, pLeft *Paddle, pRight *Paddle) {
	seconds := float64(d.Seconds())

	moveX := seconds * b.VelX
	moveY := seconds * b.VelY

	newX := b.PosX + moveX
	newY := b.PosY + moveY

	if newY-b.Radius < 0 {
		newY = b.Radius
		b.VelY = -b.VelY
	} else if newY+b.Radius > 1 {
		newY = 1 - b.Radius
		b.VelY = -b.VelY
	}

	// For now, bounce off X walls and ignore paddles
	if newX-b.Radius < 0 {
		newX = b.Radius
		b.VelX = -b.VelX
	} else if newX+b.Radius > 1 {
		newX = 1 - b.Radius
		b.VelX = -b.VelX
	}

	b.PosX = newX
	b.PosY = newY
}
