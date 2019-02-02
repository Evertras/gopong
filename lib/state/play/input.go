package play

// InputMessage is a serialized input message from the client
type InputMessage struct {
	// MovementAxis is a value from [-1,1] where -1 is up and 1 is down
	MovementAxis float64 `json:"m"`

	// DurationSeconds describes how long the input was applied, in seconds
	DurationSeconds float64 `json:"d"`

	// InputIndex is a constantly incrementing index set by the client for order/reconciliation purposes
	InputIndex int `json:"n"`
}
