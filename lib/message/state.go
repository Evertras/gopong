package message

// StateType is just an int that can identify different states
type StateType int

const (
	// StatePlay is the actual game itself
	StatePlay StateType = 0

	// StateStarting is the initial countdown to start the game
	StateStarting = 1
)

// State contains information about the current game state to be sent to clients
type State struct {
	// Data contains the state data
	Data interface{} `json:"s" tsdesc:"The actual state data.  Each state should understand its own schema."`

	// Type is the current state type
	Type StateType `json:"t" tstype:"ServerState" tsdesc:"The state type this message describes."`

	// LastInputIndex is the last input index seen by the server for the receiving client
	LastInputIndex int `json:"n" tsdesc:"The last input index for this client seen by the server."`
}
