package play

import (
	"math"
	"testing"
	"time"
)

func TestPaddleBoundsCorrectly(t *testing.T) {
	const initialPos = 0.5
	const height = 0.1
	const expectedPos = 1 - (height * 0.5)
	const expectedSecondPos = height * 0.5
	const speed = 100
	const duration = time.Second

	p := Paddle{
		Center: initialPos,
		Height: height,
	}

	p.Center = 100

	p.Bound()

	if math.Abs(p.Center-expectedPos) > epsilon {
		t.Fatalf("Paddle found at %v but expected %v", p.Center, expectedPos)
	}

	p.Center = -100

	p.Bound()

	if math.Abs(p.Center-expectedSecondPos) > epsilon {
		t.Fatalf("Paddle found at %v but expected %v", p.Center, expectedSecondPos)
	}
}
