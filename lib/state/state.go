package state

import (
	"time"

	gopongmsg "github.com/Evertras/gopong/messages/gomessage"
)

// State is a singular state of the game that can be advanced
type State interface {
	// Step will advance the state by the given time and return the state the game is
	// now in.  Note that this may be a new state entirely due to a state transition.
	Step(delta time.Duration) State

	// Marshal must fill in msg with the appropriate state information.
	Marshal(msg *gopongmsg.Server_State) error

	// ApplyInput applies the given input on the given side.  Note that we use the side
	// explicitly separate here to enforce that we can't trust any message from the client.
	ApplyInput(input gopongmsg.Client_Input, side gopongmsg.Server_Config_PaddleSide)
}
