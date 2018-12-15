package main

import (
	"log"

	"github.com/Evertras/gopong/lib/server"
)

func main() {
	s := server.Server{}

	log.Fatal(s.Listen(":8000"))
}
