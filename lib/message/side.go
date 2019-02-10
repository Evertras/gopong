package message

// PlayerSide is an enum type to signify which side some information is concerned about.
type PlayerSide int

const (
	// PlayerSideLeft signifies the left player.  Hardcoded to 0 explicitly.
	PlayerSideLeft PlayerSide = 0

	// PlayerSideRight signifies the right player.  Hardcoded to 1 explicitly.
	PlayerSideRight PlayerSide = 1
)