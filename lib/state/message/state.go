package message

// StateType is just an int that can identify different states
type StateType int

const (
	// StatePlay is the actual game itself
	StatePlay StateType = iota

	// StateStarting is the initial countdown to start the game
	StateStarting
)

// State contains information about the current game state to be sent to clients
type State struct {
	// Data contains the state data
	Data interface{} `json:"s"`

	// Type is the current state type
	Type StateType `json:"t"`

	// LastInputIndex is the last input index seen by the server for the receiving client
	LastInputIndex int `json:"n"`
}
