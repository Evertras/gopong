package main

import (
	"fmt"

	"github.com/evertras/gopong/lib"
)

//go:generate go run gen.go

func main() {
	fmt.Println(lib.Index())
}
