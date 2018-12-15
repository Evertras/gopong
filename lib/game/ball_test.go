package game

import (
	"math"
	"testing"
	"time"
)

func TestBallStepMovesBall(t *testing.T) {
	pLeft := &Paddle{
		Center: 0.5,
		Height: 0.1,
		Side:   PaddleLeft,
		Speed:  0,
	}

	pRight := &Paddle{
		Center: 0.5,
		Height: 0.1,
		Side:   PaddleLeft,
		Speed:  0,
	}

	duration := time.Millisecond * 100

	initialPosX := 0.5
	speedX := 0.1
	expectedPosX := initialPosX + speedX*0.1

	initialPosY := 0.6
	speedY := 0.2
	expectedPosY := initialPosY + speedY*0.1

	b := Ball{
		PosX:   initialPosX,
		PosY:   initialPosY,
		VelX:   speedX,
		VelY:   speedY,
		Radius: 0.01,
	}

	b.Step(duration, pLeft, pRight)

	if math.Abs(b.PosX-expectedPosX) > epsilon {
		t.Errorf("Found ball at x position %v but expected %v", b.PosX, expectedPosX)
	}

	if math.Abs(b.PosY-expectedPosY) > epsilon {
		t.Errorf("Found ball at y position %v but expected %v", b.PosY, expectedPosY)
	}
}

func TestBallStepBouncesBallOffFloor(t *testing.T) {
	pLeft := &Paddle{
		Center: 0.5,
		Height: 0.1,
		Side:   PaddleLeft,
		Speed:  0,
	}

	pRight := &Paddle{
		Center: 0.5,
		Height: 0.1,
		Side:   PaddleLeft,
		Speed:  0,
	}

	duration := time.Second

	initialPosX := 0.5
	speedX := 0.1

	initialPosY := 0.85
	speedY := 0.2

	b := Ball{
		PosX:   initialPosX,
		PosY:   initialPosY,
		VelX:   speedX,
		VelY:   speedY,
		Radius: 0.1,
	}

	b.Step(duration, pLeft, pRight)

	if b.PosY+b.Radius > 1 {
		t.Fatal("Ball went through floor")
	}

	if b.VelY > 0 {
		t.Fatal("Y velocity is still positive")
	}

	if b.VelX != speedX {
		t.Fatalf("X velocity should not be modified but is now %v", b.VelX)
	}
}

// There's a lot of redundant code here, but refactor later...
func TestBallStepBouncesBallOffCeiling(t *testing.T) {
	pLeft := &Paddle{
		Center: 0.5,
		Height: 0.1,
		Side:   PaddleLeft,
		Speed:  0,
	}

	pRight := &Paddle{
		Center: 0.5,
		Height: 0.1,
		Side:   PaddleLeft,
		Speed:  0,
	}

	duration := time.Second

	initialPosX := 0.5
	speedX := 0.1

	initialPosY := 0.15
	speedY := -0.2

	b := Ball{
		PosX:   initialPosX,
		PosY:   initialPosY,
		VelX:   speedX,
		VelY:   speedY,
		Radius: 0.1,
	}

	b.Step(duration, pLeft, pRight)

	if b.PosY-b.Radius < 0 {
		t.Fatal("Ball went through ceiling")
	}

	if b.VelY < 0 {
		t.Fatal("Y velocity is still negative")
	}

	if b.VelX != speedX {
		t.Fatalf("X velocity should not be modified but is now %v", b.VelX)
	}
}
