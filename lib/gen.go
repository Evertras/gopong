//+build ignore

package main

import (
	"html/template"
	"os"
	"time"
)

func main() {
	f, err := os.Create("tmp.go")
	defer f.Close()

	if err != nil {
		panic(err)
	}

	packageTemplate.Execute(f, struct {
		Timestamp time.Time
		Index     string
	}{
		Timestamp: time.Now(),
		Index:     "hello\nhello",
	})
}

var packageTemplate = template.Must(template.New("").Parse(`// Code generated by go generate; DO NOT EDIT.
// This file was generated by robots at
// {{ .Timestamp }}
package lib

var indexContents = ` + "`{{ .Index }}`"))
