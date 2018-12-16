package main

import (
	"context"
	"log"
	"time"

	"github.com/Evertras/gopong/lib/game"
	"github.com/Evertras/gopong/lib/server"
)

func main() {
	ctx := context.Background()
	cfg := server.Config{
		TickRate: time.Millisecond * 10,
		GameCfg: game.Config{
			BallRadius:   0.02,
			PaddleHeight: 0.2,
		},
	}

	s := server.New(ctx, cfg)

	log.Println("Starting")

	log.Fatal(s.Listen("localhost:8000"))
}
