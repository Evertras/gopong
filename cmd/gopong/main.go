package main

import (
	"context"
	"log"

	"github.com/Evertras/gopong/lib/game"
	"github.com/Evertras/gopong/lib/server"
)

func main() {
	ctx := context.Background()
	cfg := game.Config{
		BallRadius:   0.02,
		PaddleHeight: 0.2,
	}

	s := server.New(ctx, cfg)

	log.Println("Starting")

	log.Fatal(s.Listen("localhost:8000"))
}
