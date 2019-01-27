//+build ignore

package main

import (
	"io/ioutil"
	"os"
	"text/template"
	"time"
)

func main() {
	// Note: this is all jank for prototype purposes, a better system by far
	// would be to have a map of filenames to string content and have the mux
	// serve up appropriately... but this is faster for POC
	index, err := ioutil.ReadFile("../../front/index.html")

	if err != nil {
		panic(err)
	}

	game, err := ioutil.ReadFile("../../front/game.js")

	if err != nil {
		panic(err)
	}

	style, err := ioutil.ReadFile("../../front/style.css")

	if err != nil {
		panic(err)
	}

	f, err := os.Create("build.go")
	defer f.Close()

	if err != nil {
		panic(err)
	}

	packageTemplate.Execute(
		f,
		struct {
			Timestamp time.Time
			Index     string
			Game      string
			Style     string
		}{
			Timestamp: time.Now(),
			Index:     string(index),
			Game:      string(game),
			Style:     string(style),
		})
}

var packageTemplate = template.Must(template.New("").Parse(`// Code generated by go generate; DO NOT EDIT.
// This file was generated by robots at
// {{ .Timestamp }}
package static

// StaticHtmlIndex is the raw contents of index.html
var StaticHtmlIndex = ` + "`{{ .Index }}`" + `

// StaticJsGame is the raw contents of game.js
var StaticJsGame = ` + "`{{ .Game }}`" + `

// StaticCssStyle is the raw contents of style.css
var StaticCssStyle = ` + "`{{ .Style }}`"))
