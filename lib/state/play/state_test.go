package play

import (
	"encoding/json"
	"testing"
	"time"
)

func TestStateBallBouncesOffPaddles(t *testing.T) {
	state := &State{
		PaddleLeft: &Paddle{
			Center: 0,
			Height: 0.01,
		},
		PaddleRight: &Paddle{
			Center: 0,
			Height: 0.01,
		},
		Ball: &Ball{
			PosX: 0.5,
			PosY: 0.5,
			VelX: 1.1,
			VelY: 0.01,
		},
	}

	// Just for sanity...
	if state.Ball.VelX < 0 {
		t.Fatal("Expected ball to be moving to the right for this test, test setup fail")
	}

	// Should bounce off right paddle
	state.Step(time.Second)

	if state.Ball.VelX > 0 {
		t.Fatalf("Expected ball to be moving left now: %+v", state.Ball)
	}

	// Should bounce off left paddle
	state.Step(time.Second)

	if state.Ball.VelX < 0 {
		t.Fatalf("Expected ball to be moving right now: %+v", state.Ball)
	}
}

func TestStateMarshalsToJson(t *testing.T) {
	state := &State{
		PaddleLeft: &Paddle{
			Center: 0.5,
			Height: 0.4,
		},
		PaddleRight: &Paddle{
			Center: 0.6,
			Height: 0.7,
		},
		Ball: &Ball{
			PosX:   0.5,
			PosY:   0.6,
			VelX:   -0.1,
			VelY:   -0.2,
			Radius: 0.05,
		},
	}

	b, err := json.Marshal(state)

	if err != nil {
		t.Fatal(err)
	}

	unmarshaled := &State{}

	err = json.Unmarshal(b, unmarshaled)

	if err != nil {
		t.Fatal(err)
	}

	if unmarshaled.PaddleLeft.Center != state.PaddleLeft.Center {
		t.Error("PaddleLeft not the same")
	}

	if unmarshaled.PaddleRight.Center != state.PaddleRight.Center {
		t.Error("PaddleRight not the same")
	}

	if unmarshaled.Ball.PosX != state.Ball.PosX {
		t.Error("Ball not the same")
	}
}

func BenchmarkStateMarshalJson(b *testing.B) {
	state := &State{
		PaddleLeft: &Paddle{
			Center: 0.5,
			Height: 0.4,
		},
		PaddleRight: &Paddle{
			Center: 0.6,
			Height: 0.7,
		},
		Ball: &Ball{
			PosX:   0.5,
			PosY:   0.6,
			VelX:   -0.1,
			VelY:   -0.2,
			Radius: 0.05,
		},
	}

	for n := 0; n < b.N; n++ {
		_, err := json.Marshal(state)

		if err != nil {
			b.Fatal(err)
		}
	}
}
