package server

import (
	"context"
	"encoding/json"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/Evertras/gopong/lib/game"
	"github.com/Evertras/gopong/lib/static"
	metrics "github.com/armon/go-metrics"
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

	clients map[int]client
}

type stateMessage struct {
	State          *game.State `json:"s"`
	LastInputIndex int         `json:"n"`
}

// New creates a new server and initializes its game state, but does not start the game
func New(ctx context.Context, cfg Config) *Server {
	return &Server{
		State: game.New(cfg.GameCfg),

		ctx:     ctx,
		cfg:     cfg,
		clients: make(map[int]client),
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
					log.Printf("Error reading %s: %v", f, err)
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
				s.State.Step(time.Since(d))

				stateMessage := stateMessage{
					State: s.State,
				}

				s.connectionMutex.Lock()
				for _, c := range s.clients {
					stateMessage.LastInputIndex = 100

					msg, err := json.Marshal(stateMessage)

					if err != nil {
						log.Fatal(err)
					}

					c.out <- msg
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
