package server

import (
	"log"
	"net/http"

	"github.com/Evertras/gopong/lib/client"
	"github.com/Evertras/gopong/lib/instance"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{}

var connectionIDCounter = 0

func join(s *Server) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, req *http.Request) {
		conn, err := upgrader.Upgrade(w, req, nil)

		if err != nil {
			log.Println("upgrade error:", err)
			return
		}

		// Conveniently this mutex will double to make connectionIDCounter thread safe
		s.connectionMutex.Lock()

		connectionID := connectionIDCounter
		connectionIDCounter++
		c := client.New(connectionIDCounter, conn)
		s.clients[connectionID] = c

		s.connectionMutex.Unlock()

		if s.waitingClient == nil {
			s.waitingClient = c
		} else {
			cfg := instance.Config{
				Play:         s.cfg.GameCfg,
				StepInterval: s.cfg.TickRate,
			}

			i := instance.New(cfg, s.waitingClient, c)

			go i.Run()
		}

		defer func() {
			s.connectionMutex.Lock()
			defer s.connectionMutex.Unlock()

			conn.Close()
			delete(s.clients, connectionID)
		}()

		<-c.Done()
	}
}
