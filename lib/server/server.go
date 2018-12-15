package server

import (
	"io"
	"net/http"

	"github.com/evertras/gopong/lib/static"
)

// Server is an HTTP server that will serve static content and handle web socket connections
type Server struct {
}

// Listen will start listening and block until the server closes
func (s *Server) Listen(addr string) error {
	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, req *http.Request) {
		io.WriteString(w, static.StaticHtmlIndex)
	})

	httpServer := http.Server{
		Addr:    ":8000",
		Handler: mux,
	}

	return httpServer.ListenAndServe()
}
