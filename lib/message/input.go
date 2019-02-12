package message

// Input is a serialized input message from the client
type Input struct {
	// ID is the client's ID; this is not supplied by the client for obvious cheaty reasons
	ID int `json:"-"`

	// MovementAxis is a value from [-1,1] where -1 is up and 1 is down
	MovementAxis float64 `json:"m" tsdesc:"Movement axis in range [-1,1]"`

	// DurationSeconds describes how long the input was applied, in seconds
	DurationSeconds float64 `json:"d" tsdesc:"Duration in seconds"`

	// InputIndex is a constantly incrementing index set by the client for order/reconciliation purposes
	InputIndex int `json:"n" tsdesc:"Input index"`
}
