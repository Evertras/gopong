package message

import "github.com/Evertras/gopong/lib/store"

// ClientConfig is a message sent to the client to define the game's config.
// It's wrapped in an inner structure to avoid JSON key collisions in the root.
type ClientConfig struct {
	Config     store.Config `json:"gameConfig" tsdesc:"The general configuration of the game"`
	PaddleSide PlayerSide   `json:"playerSide" tstype:"ServerPaddleSide" tsdesc:"Which side the receiving client is on"`
}
