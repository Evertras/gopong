package game

import (
	"encoding/json"
	"math"
	"testing"
	"time"
)

func TestPaddleMarshalsToJson(t *testing.T) {
	paddle := &Paddle{
		Center: 0.5,
		Height: 0.4,
		Speed:  0.1,
	}

	b, err := json.Marshal(paddle)

	if err != nil {
		t.Fatal(err)
	}

	unmarshaled := &Paddle{}

	err = json.Unmarshal(b, unmarshaled)

	if err != nil {
		t.Fatal(err)
	}

	if unmarshaled.Speed == paddle.Speed {
		t.Error("Speed should not be marshaled, but it was")
	}

	if unmarshaled.Height == paddle.Height {
		t.Error("Height should not be marshaled, but it was")
	}

	if unmarshaled.Center != paddle.Center {
		t.Error("Center not equal")
	}
}

func BenchmarkPaddleMarshalJson(b *testing.B) {
	paddle := &Paddle{
		Center: 0.5,
		Height: 0.4,
		Speed:  0.1,
	}

	for n := 0; n < b.N; n++ {
		_, err := json.Marshal(paddle)

		if err != nil {
			b.Fatal(err)
		}
	}
}

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
