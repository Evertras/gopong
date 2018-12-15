package server

import (
	"io"
	"net/http"

	"github.com/Evertras/gopong/lib/static"
)

// Server is an HTTP server that will serve static content and handle web socket connections
type Server struct {
}

// Listen will start listening and block until the server closes
func (s *Server) Listen(addr string) error {
	mux := http.NewServeMux()

	// <jank>
	// Note: the following is jank for prototype purposes, this should
	// be an in-memory file system in a for-reals app... but this is easier
	mux.HandleFunc("/", func(w http.ResponseWriter, req *http.Request) {
		io.WriteString(w, static.StaticHtmlIndex)
	})
	mux.HandleFunc("/game.js", func(w http.ResponseWriter, req *http.Request) {
		io.WriteString(w, static.StaticJsGame)
	})
	mux.HandleFunc("/style.css", func(w http.ResponseWriter, req *http.Request) {
		io.WriteString(w, static.StaticCssStyle)
	})
	// </jank>

	mux.HandleFunc("/join", join)

	httpServer := http.Server{
		Addr:    ":8000",
		Handler: mux,
	}

	return httpServer.ListenAndServe()
}
