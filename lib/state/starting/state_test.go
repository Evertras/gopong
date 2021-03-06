package starting

import (
	"testing"
	"time"

	"github.com/Evertras/gopong/lib/store"
)

func TestStateWaitsForSpecifiedTime(t *testing.T) {
	waitTime := time.Second
	s := New(store.New(), waitTime)

	if s.Remaining < time.Second {
		t.Fatal("Unexpected wait time to start:", s.Remaining)
	}

	next := s.Step(time.Millisecond * 500)

	if next != s {
		t.Fatal("Tried to change state unexpectedly")
	}

	next = s.Step(time.Millisecond * 500)

	if next == s {
		t.Fatal("Didn't try to change after teaching time limit")
	}
}
