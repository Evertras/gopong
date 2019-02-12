package play

import (
	"math"
	"time"
)

// Ball represents the ball with a position, size, and velocity
type Ball struct {
	PosX float64 `json:"x" tsdesc:"The center X coordinate of the ball in [0,1] coordinates"`
	PosY float64 `json:"y" tsdesc:"The center Y coordinate of the ball in [0,1] coordinates"`

	VelX float64 `json:"-"`
	VelY float64 `json:"-"`

	Radius float64 `json:"-"`
}

// Step moves the ball, bouncing off the ceiling, floor, and paddles
func (b *Ball) Step(d time.Duration, pLeft Paddle, pRight Paddle) {
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

	// Check for paddle collisions... check right if we're moving right,
	// and check left if we're moving left
	if b.VelX > 0 {
		if 1-(newX+b.Radius) < pRight.Width {
			if math.Abs(newY-pRight.Center) < pRight.Height*0.5+b.Radius {
				newX = 1 - (b.Radius + pRight.Width)
				b.VelX = -b.VelX
			}
		}
	} else {
		if newX-b.Radius < pLeft.Width {
			if math.Abs(newY-pLeft.Center) < pLeft.Height*0.5+b.Radius {
				newX = b.Radius + pLeft.Width
				b.VelX = -b.VelX
			}
		}
	}

	// Check for regular side wall collisions... for now just bounce off
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
