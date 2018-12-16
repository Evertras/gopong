package server

import (
	"context"
	"io"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/Evertras/gopong/lib/game"
	"github.com/Evertras/gopong/lib/static"
)

// Config contains all configuration to run the server
type Config struct {
	TickRate time.Duration
	GameCfg  game.Config
}

// Server is an HTTP server that will serve static content and handle web socket connections
type Server struct {
	State *game.State

	ctx context.Context
	cfg Config

	connectionMutex sync.Mutex

	connections map[int]connection
}

// New creates a new server and initializes its game state, but does not start the game
func New(ctx context.Context, cfg Config) *Server {
	return &Server{
		State: game.New(cfg.GameCfg),

		ctx:         ctx,
		cfg:         cfg,
		connections: make(map[int]connection),
	}
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

	mux.HandleFunc("/join", join(s))

	go func() {
		ticker := time.NewTicker(s.cfg.TickRate)
		defer ticker.Stop()
		d := time.Now()
		for {
			select {
			case <-ticker.C:
				msg, err := s.State.Step(time.Since(d))

				if err != nil {
					log.Fatal(err)
				}

				s.connectionMutex.Lock()
				for _, v := range s.connections {
					v.out <- msg
				}
				s.connectionMutex.Unlock()

				d = time.Now()
			}
		}
	}()

	httpServer := http.Server{
		Addr:    addr,
		Handler: mux,
	}

	return httpServer.ListenAndServe()
}
