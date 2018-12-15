package game

import (
	"context"
	"time"
)

// Config contains configuration for the game
type Config struct {
	TickInterval time.Duration
}

// Instance is a single running game instance
type Instance struct {
	tick *time.Ticker
	ctx  context.Context
}

// New creates a new game without starting it
func New(ctx context.Context, cfg Config) *Instance {
	return &Instance{
		tick: time.NewTicker(cfg.TickInterval),
		ctx:  ctx,
	}
}

// Run will start the game loop
func (i *Instance) Run() {
	defer i.tick.Stop()

	for {
		select {
		case <-i.tick.C:

		case <-i.ctx.Done():
			return
		}
	}
}
