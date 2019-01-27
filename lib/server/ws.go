package server

import (
	"log"
	"net/http"

	metrics "github.com/armon/go-metrics"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{}

var connectionIDCounter = 0

type connection struct {
	out chan []byte
	in  chan []byte
}

var metricKeyWsDataWrite = []string{"ws", "data", "write"}
var metricKeyWsDataRead = []string{"ws", "data", "recv"}

func join(s *Server) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, req *http.Request) {
		c, err := upgrader.Upgrade(w, req, nil)

		if err != nil {
			log.Println("upgrade error:", err)
			return
		}

		conn := connection{
			out: make(chan []byte, 5),
			in:  make(chan []byte, 5),
		}

		// Conveniently this mutex will double to make connectionIDCounter thread safe
		s.connectionMutex.Lock()

		connectionID := connectionIDCounter
		connectionIDCounter++
		s.connections[connectionID] = conn

		s.connectionMutex.Unlock()

		defer func() {
			s.connectionMutex.Lock()
			defer s.connectionMutex.Unlock()

			c.Close()
			delete(s.connections, connectionID)
		}()

		go func() {
			for {
				_, message, err := c.ReadMessage()

				if err != nil {
					log.Println("read error:", err)
					return
				}

				conn.in <- message
			}
		}()

		for {
			select {
			case msg := <-conn.out:
				metrics.IncrCounter(metricKeyWsDataWrite, float32(len(msg)))

				if err := c.WriteMessage(websocket.TextMessage, msg); err != nil {
					log.Println("write error:", err)
					return
				}

			case msg := <-conn.in:
				log.Println("recv:", string(msg))

				metrics.IncrCounter(metricKeyWsDataRead, float32(len(msg)))
			}
		}
	}
}
