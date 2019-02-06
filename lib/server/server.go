package server

import (
	"context"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"sync"

	"github.com/Evertras/gopong/lib/client"
	"github.com/Evertras/gopong/lib/state/play"
	"github.com/Evertras/gopong/lib/static"
	"github.com/Evertras/gopong/lib/store"
)

// Config contains all configuration to run the server
type Config struct {
	// GameCfg is the game configuration, such as paddle height, etc.
	GameCfg *store.Config

	// ReadStaticFilesPerRequest determines if the server will read from disk on each request
	// or use the precompiled static files.  Useful for development, should not
	// be on otherwise.
	ReadStaticFilesPerRequest bool
}

// Server is an HTTP server that will serve static content and handle web socket connections
type Server struct {
	State *play.State

	ctx context.Context
	cfg Config

	connectionMutex sync.Mutex

	clients map[int]*client.Client

	waitingClient *client.Client
}

// New creates a new server that's ready to listen but hasn't started yet
func New(ctx context.Context, cfg Config) *Server {
	return &Server{
		State: play.New(cfg.GameCfg),

		ctx:     ctx,
		cfg:     cfg,
		clients: make(map[int]*client.Client),
	}
}

// Listen will start listening and block until the server closes
func (s *Server) Listen(addr string) error {
	mux := http.NewServeMux()

	// <jank>
	// Note: the following is jank for prototype purposes, this should
	// be an in-memory file system in a for-reals app... but this is easier
	if s.cfg.ReadStaticFilesPerRequest {
		log.Println("Reading files from disk for every request, ONLY USE THIS FOR DEV MODE!")

		fileReaderFactory := func(f string, contentType string) func(w http.ResponseWriter, req *http.Request) {
			return func(w http.ResponseWriter, req *http.Request) {
				index, err := ioutil.ReadFile(f)

				if err != nil {
					log.Printf("Error reading %s: %v", f, err)
					w.WriteHeader(500)
					return
				}

				w.Header().Set("Content-Type", contentType)
				io.WriteString(w, string(index))
			}
		}

		mux.HandleFunc("/", fileReaderFactory("./front/index.html", "text/html"))
		mux.HandleFunc("/game.js", fileReaderFactory("./front/game.js", "script/javascript"))
		mux.HandleFunc("/style.css", fileReaderFactory("./front/style.css", "text/css"))
	} else {
		mux.HandleFunc("/", func(w http.ResponseWriter, req *http.Request) {
			w.Header().Set("Content-Type", "text/html")
			io.WriteString(w, static.StaticHtmlIndex)
		})
		mux.HandleFunc("/game.js", func(w http.ResponseWriter, req *http.Request) {
			w.Header().Set("Content-Type", "script/javascript")
			io.WriteString(w, static.StaticJsGame)
		})
		mux.HandleFunc("/style.css", func(w http.ResponseWriter, req *http.Request) {
			w.Header().Set("Content-Type", "text/css")
			io.WriteString(w, static.StaticCssStyle)
		})
	}
	// </jank>

	mux.HandleFunc("/join", join(s))

	httpServer := http.Server{
		Addr:    addr,
		Handler: mux,
	}

	return httpServer.ListenAndServe()
}
