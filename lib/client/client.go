package client

import (
	"context"
	"encoding/json"
	"log"
	"sync"

	"github.com/Evertras/gopong/lib/state/message"
	metrics "github.com/armon/go-metrics"
	"github.com/gorilla/websocket"
	"github.com/pkg/errors"
)

var metricKeyWsDataWrite = []string{"ws", "data", "write"}
var metricKeyWsDataRead = []string{"ws", "data", "recv"}

const inputFlushThreshold = 100

// Client is a single connected client
type Client struct {
	id             int
	conn           *websocket.Conn
	lastInput      int
	receivedInputs []message.Input
	ctx            context.Context

	mu sync.RWMutex
}

// New creates a new client that listens to the given connection
func New(id int, conn *websocket.Conn) *Client {
	ctx, cancel := context.WithCancel(context.Background())

	client := &Client{
		id:   id,
		conn: conn,
		ctx:  ctx,
	}

	// Receive message pump
	go func() {
		defer cancel()

		for {
			_, data, err := conn.ReadMessage()

			if err != nil {
				log.Println("Read error:", err)
				return
			}

			metrics.IncrCounter(metricKeyWsDataRead, float32(len(data)))

			inputMessage := message.Input{}

			// Assuming it's this for now, figure out how to select between multiple message types later
			json.Unmarshal(data, &inputMessage)

			client.mu.Lock()

			client.lastInput = inputMessage.InputIndex
			client.receivedInputs = append(client.receivedInputs, inputMessage)

			// Failsafe... if we haven't been asked about inputs for a while, we're going to assume
			// that we can just drop what we have
			if len(client.receivedInputs) > inputFlushThreshold {
				client.receivedInputs = []message.Input{}
			}

			client.mu.Unlock()
		}
	}()

	return client
}

// GetLastInputIndex gets the last received input index that this client has seen
func (c *Client) GetLastInputIndex() int {
	c.mu.RLock()

	index := c.lastInput

	c.mu.RUnlock()

	return index
}

// FlushInputs returns all waiting inputs received from the client and removes
// them from the buffer.  This is a destructive call!
func (c *Client) FlushInputs() []message.Input {
	c.mu.Lock()

	inputs := c.receivedInputs
	c.receivedInputs = nil

	c.mu.Unlock()

	return inputs
}

// WriteState writes a state message to the client.  Note that the last input index
// is filled in automatically by WriteState.
func (c *Client) WriteState(m message.State) error {
	m.LastInputIndex = c.GetLastInputIndex()
	msg, err := json.Marshal(m)

	if err != nil {
		return errors.Wrap(err, "error marshaling state message")
	}

	if err = c.conn.WriteMessage(websocket.TextMessage, msg); err != nil {
		return errors.Wrap(err, "error writing message")
	}

	metrics.IncrCounter(metricKeyWsDataWrite, float32(len(msg)))

	return nil
}

// Done returns a channel that will close once the client disconnects
func (c *Client) Done() <-chan struct{} {
	return c.ctx.Done()
}

// Close closes the underlying connection immediately
func (c *Client) Close() error {
	return c.conn.Close()
}

// ID returns the client's ID that was set on creation
func (c *Client) ID() int {
	return c.id
}
