package server

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{}

func join(w http.ResponseWriter, req *http.Request) {
	c, err := upgrader.Upgrade(w, req, nil)

	if err != nil {
		log.Println("upgrade error:", err)
		return
	}

	defer c.Close()

	for {
		mt, message, err := c.ReadMessage()

		if err != nil {
			log.Println("read error:", err)
		}

		log.Println("recv:", mt, string(message))

		err = c.WriteMessage(mt, message)

		if err != nil {
			log.Println("write error:", err)
			break
		}
	}
}
