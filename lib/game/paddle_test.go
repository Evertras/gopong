package game

import (
	"math"
	"testing"
	"time"
)

const epsilon = 0.0001

func TestPaddleStepMovesPaddle(t *testing.T) {
	const initialPos = 0.5
	const expectedPos = 0.55
	const speed = 0.5
	const duration = time.Millisecond * 100

	p := Paddle{
		Center: initialPos,
		Height: 0.1,
		Speed:  speed,
	}

	p.Step(duration)

	if math.Abs(p.Center-initialPos) < epsilon {
		t.Fatal("Paddle did not move")
	}

	if p.Center < initialPos {
		t.Fatal("Paddle moved in wrong direction")
	}

	if math.Abs(p.Center-expectedPos) > epsilon {
		t.Fatalf("Paddle found at %v but expected %v", p.Center, expectedPos)
	}
}

func TestPaddleStepBoundsPaddle(t *testing.T) {
	const initialPos = 0.5
	const height = 0.1
	const expectedPos = 1 - (height * 0.5)
	const expectedSecondPos = height * 0.5
	const speed = 100
	const duration = time.Second

	p := Paddle{
		Center: initialPos,
		Height: height,
		Speed:  speed,
	}

	p.Step(duration)

	if math.Abs(p.Center-expectedPos) > epsilon {
		t.Fatalf("Paddle found at %v but expected %v", p.Center, expectedPos)
	}

	p.Speed = -speed

	p.Step(duration)

	if math.Abs(p.Center-expectedSecondPos) > epsilon {
		t.Fatalf("Paddle found at %v but expected %v", p.Center, expectedSecondPos)
	}
}
