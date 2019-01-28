package server

import (
	"context"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"sync"
	"time"

	metrics "github.com/armon/go-metrics"
	"github.com/evertras/gopong/lib/game"
	"github.com/evertras/gopong/lib/static"
)

// Config contains all configuration to run the server
type Config struct {
	// TickRate is how long between each update tick
	TickRate time.Duration

	// GameCfg is the game configuration, such as paddle height, etc.
	GameCfg game.Config

	// ReadStaticFilesPerRequest determines if the server will read from disk on each request
	// or use the precompiled static files.  Useful for development, should not
	// be on otherwise.
	ReadStaticFilesPerRequest bool
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

var metricKeyGameLoopActive = []string{"game", "loop", "active"}

// Listen will start listening and block until the server closes
func (s *Server) Listen(addr string) error {
	mux := http.NewServeMux()

	// <jank>
	// Note: the following is jank for prototype purposes, this should
	// be an in-memory file system in a for-reals app... but this is easier
	if s.cfg.ReadStaticFilesPerRequest {
		log.Println("Reading files from disk for every request, ONLY USE THIS FOR DEV MODE!")

		fileReaderFactory := func(f string) func(w http.ResponseWriter, req *http.Request) {
			return func(w http.ResponseWriter, req *http.Request) {
				index, err := ioutil.ReadFile(f)

				if err != nil {
					log.Printf("Error reading index.html: %v", err)
					w.WriteHeader(500)
					return
				}

				io.WriteString(w, string(index))
			}
		}

		mux.HandleFunc("/", fileReaderFactory("./front/index.html"))
		mux.HandleFunc("/game.js", fileReaderFactory("./front/game.js"))
		mux.HandleFunc("/style.css", fileReaderFactory("./front/style.css"))
	} else {
		mux.HandleFunc("/", func(w http.ResponseWriter, req *http.Request) {
			io.WriteString(w, static.StaticHtmlIndex)
		})
		mux.HandleFunc("/game.js", func(w http.ResponseWriter, req *http.Request) {
			io.WriteString(w, static.StaticJsGame)
		})
		mux.HandleFunc("/style.css", func(w http.ResponseWriter, req *http.Request) {
			io.WriteString(w, static.StaticCssStyle)
		})
	}
	// </jank>

	mux.HandleFunc("/join", join(s))

	go func() {
		ticker := time.NewTicker(s.cfg.TickRate)
		defer ticker.Stop()
		d := time.Now()
		startTime := d
		for {
			select {
			case <-ticker.C:
				startTime = time.Now()
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

				metrics.MeasureSince(metricKeyGameLoopActive, startTime)
			}
		}
	}()

	httpServer := http.Server{
		Addr:    addr,
		Handler: mux,
	}

	return httpServer.ListenAndServe()
}
