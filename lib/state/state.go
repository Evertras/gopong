package state

import (
	"time"

	"github.com/Evertras/gopong/lib/state/message"
)

// State is a singular state of the game that can be advanced
type State interface {
	// Step will advance the state by the given time and return the state the game is
	// now in.  Note that this may be a new state entirely due to a state transition.
	Step(delta time.Duration) State

	// Marshal must marshal the current state as a JSON message and put it into
	// a message.State object to send to clients.
	Marshal() (message.State, error)
}
