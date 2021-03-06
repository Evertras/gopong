package client

import (
	"context"
	"log"
	"sync"

	"github.com/Evertras/gopong/lib/store"
	gopongmsg "github.com/Evertras/gopong/messages/gomessage"
	metrics "github.com/armon/go-metrics"
	"github.com/golang/protobuf/proto"
	"github.com/gorilla/websocket"
	"github.com/pkg/errors"
)

var metricKeyWsDataWrite = []string{"ws", "data", "write"}
var metricKeyWsDataRead = []string{"ws", "data", "recv"}

const inputFlushThreshold = 100

// Client is a single connected client that buffers received input
type Client struct {
	id             int
	conn           *websocket.Conn
	lastInput      uint32
	receivedInputs []gopongmsg.Input
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

			msg := gopongmsg.Client{}

			proto.Unmarshal(data, &msg)

			input := msg.GetInput()

			if input == nil {
				continue
			}

			client.mu.Lock()

			client.lastInput = input.InputIndex
			client.receivedInputs = append(client.receivedInputs, *input)

			// Failsafe... if we haven't been asked about inputs for a while, we're going to assume
			// that we can just drop what we have
			if len(client.receivedInputs) > inputFlushThreshold {
				client.receivedInputs = []gopongmsg.Input{}
			}

			client.mu.Unlock()
		}
	}()

	return client
}

// GetLastInputIndex gets the last received input index that this client has seen
func (c *Client) GetLastInputIndex() uint32 {
	c.mu.RLock()

	index := c.lastInput

	c.mu.RUnlock()

	return index
}

// FlushInputs returns all waiting inputs received from the client and removes
// them from the buffer.  This is a destructive call!
func (c *Client) FlushInputs() []gopongmsg.Input {
	c.mu.Lock()

	inputs := c.receivedInputs
	c.receivedInputs = nil

	c.mu.Unlock()

	return inputs
}

func (c *Client) write(msg []byte) error {
	if err := c.conn.WriteMessage(websocket.BinaryMessage, msg); err != nil {
		return errors.Wrap(err, "error writing state")
	}

	metrics.IncrCounter(metricKeyWsDataWrite, float32(len(msg)))

	return nil
}

func (c *Client) Write(msg gopongmsg.Server) error {
	data, err := proto.Marshal(&msg)

	if err != nil {
		return errors.Wrap(err, "failed to marshal to protobuf")
	}

	return c.write(data)
}

// WriteState writes a state message to the client.  Note that the last input index
// is filled in automatically by WriteState.
func (c *Client) WriteState(m gopongmsg.State) error {
	m.LastInputIndex = c.GetLastInputIndex()
	msg := gopongmsg.Server{
		Msg: &gopongmsg.Server_State{
			State: &m,
		},
	}

	return c.Write(msg)
}

// WriteConfig writes a config message to the client
func (c *Client) WriteConfig(cfg store.Config, side gopongmsg.Config_PaddleSide) error {
	msg := gopongmsg.Server{
		Msg: &gopongmsg.Server_Config{
			Config: &gopongmsg.Config{
				BallRadius:              float32(cfg.BallRadius),
				MaxPaddleSpeedPerSecond: float32(cfg.MaxPaddleSpeedPerSecond),
				PaddleHeight:            float32(cfg.PaddleHeight),
				PaddleWidth:             float32(cfg.PaddleWidth),
				Side:                    side,
			},
		},
	}

	return c.Write(msg)
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
