package play

import (
	"math"
	"testing"
	"time"
)

func TestBallStepMovesBall(t *testing.T) {
	pLeft := Paddle{
		Center: 0.5,
		Height: 0.1,
	}

	pRight := Paddle{
		Center: 0.5,
		Height: 0.1,
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
	pLeft := Paddle{
		Center: 0.5,
		Height: 0.1,
	}

	pRight := Paddle{
		Center: 0.5,
		Height: 0.1,
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
	pLeft := Paddle{
		Center: 0.5,
		Height: 0.1,
	}

	pRight := Paddle{
		Center: 0.5,
		Height: 0.1,
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

func TestBallBouncesOffPaddles(t *testing.T) {
	// Some constants to play with
	paddleHeight := 0.1
	paddleWidth := 0.1
	paddleCenter := 0.5
	ballRadius := 0.05

	gap := 0.01

	paddleLeft := Paddle{
		Center: paddleCenter,
		Height: paddleHeight,
		Width:  paddleWidth,
	}

	paddleRight := Paddle{
		Center: paddleCenter,
		Height: paddleHeight,
		Width:  paddleWidth,
	}

	tests := []struct {
		Name     string
		Input    Ball
		Expected Ball
	}{
		{
			Name: "Ball bounces off right paddle",
			Input: Ball{
				Radius: ballRadius,
				PosX:   1 - (paddleWidth + gap + ballRadius),
				PosY:   paddleCenter,
				VelX:   gap * 2,
				VelY:   0,
			},
			Expected: Ball{
				Radius: ballRadius,
				PosX:   1 - (paddleWidth + ballRadius),
				PosY:   paddleCenter,
				VelX:   -gap * 2,
				VelY:   0,
			},
		},
		{
			Name: "Ball bounces off left paddle",
			Input: Ball{
				Radius: ballRadius,
				PosX:   paddleWidth + gap + ballRadius,
				PosY:   paddleCenter,
				VelX:   -gap * 2,
				VelY:   0,
			},
			Expected: Ball{
				Radius: ballRadius,
				PosX:   paddleWidth + ballRadius,
				PosY:   paddleCenter,
				VelX:   gap * 2,
				VelY:   0,
			},
		},
		{
			Name: "Ball misses right paddle when above",
			Input: Ball{
				Radius: ballRadius,
				PosX:   1 - (paddleWidth + gap + ballRadius),
				PosY:   paddleCenter - (paddleHeight*0.5 + gap + ballRadius),
				VelX:   gap * 2,
				VelY:   0,
			},
			Expected: Ball{
				Radius: ballRadius,
				PosX:   1 - (paddleWidth + gap + ballRadius) + gap*2,
				PosY:   paddleCenter - (paddleHeight*0.5 + gap + ballRadius),
				VelX:   gap * 2,
				VelY:   0,
			},
		},
		{
			Name: "Ball misses right paddle when below",
			Input: Ball{
				Radius: ballRadius,
				PosX:   1 - (paddleWidth + gap + ballRadius),
				PosY:   paddleCenter + paddleHeight*0.5 + gap + ballRadius,
				VelX:   gap * 2,
				VelY:   0,
			},
			Expected: Ball{
				Radius: ballRadius,
				PosX:   1 - (paddleWidth + gap + ballRadius) + gap*2,
				PosY:   paddleCenter + paddleHeight*0.5 + gap + ballRadius,
				VelX:   gap * 2,
				VelY:   0,
			},
		},
		{
			Name: "Ball misses left paddle when above",
			Input: Ball{
				Radius: ballRadius,
				PosX:   paddleWidth + gap + ballRadius,
				PosY:   paddleCenter - (paddleHeight*0.5 + gap + ballRadius),
				VelX:   -gap * 2,
				VelY:   0,
			},
			Expected: Ball{
				Radius: ballRadius,
				PosX:   paddleWidth + gap + ballRadius - gap*2,
				PosY:   paddleCenter - (paddleHeight*0.5 + gap + ballRadius),
				VelX:   -gap * 2,
				VelY:   0,
			},
		},
		{
			Name: "Ball misses left paddle when below",
			Input: Ball{
				Radius: ballRadius,
				PosX:   paddleWidth + gap + ballRadius,
				PosY:   paddleCenter + paddleHeight*0.5 + gap + ballRadius,
				VelX:   -gap * 2,
				VelY:   0,
			},
			Expected: Ball{
				Radius: ballRadius,
				PosX:   paddleWidth + gap + ballRadius - gap*2,
				PosY:   paddleCenter + paddleHeight*0.5 + gap + ballRadius,
				VelX:   -gap * 2,
				VelY:   0,
			},
		},
	}

	for _, test := range tests {
		test.Input.Step(time.Second, paddleLeft, paddleRight)

		if !approximatelyEqual(test.Input, test.Expected) {
			t.Errorf(`%q failed.
Expected %+v
     Got %+v
`, test.Name, test.Expected, test.Input)
		}
	}
}

func approximatelyEqual(b1 Ball, b2 Ball) bool {
	if math.Abs(b1.Radius-b2.Radius) > epsilon {
		return false
	}

	if math.Abs(b1.PosX-b2.PosX) > epsilon {
		return false
	}

	if math.Abs(b1.PosY-b2.PosY) > epsilon {
		return false
	}

	if math.Abs(b1.VelX-b2.VelX) > epsilon {
		return false
	}

	if math.Abs(b1.VelY-b2.VelY) > epsilon {
		return false
	}

	return true
}

func BenchmarkBallStep(b *testing.B) {
	// Some constants to play with
	paddleHeight := 0.1
	paddleWidth := 0.1
	paddleCenter := 0.5
	ballRadius := 0.05

	paddleLeft := Paddle{
		Center: paddleCenter,
		Height: paddleHeight,
		Width:  paddleWidth,
	}

	paddleRight := Paddle{
		Center: paddleCenter,
		Height: paddleHeight,
		Width:  paddleWidth,
	}

	ball := Ball{
		PosX:   0.5,
		PosY:   0.5,
		VelX:   0.44,
		VelY:   -0.3,
		Radius: ballRadius,
	}

	for i := 0; i < b.N; i++ {
		ball.Step(time.Second, paddleLeft, paddleRight)
	}
}
