package main

import (
	"log"

	"github.com/evertras/gopong/lib/server"
)

func main() {
	s := server.Server{}

	log.Fatal(s.Listen(":8000"))
}
