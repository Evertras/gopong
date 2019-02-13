# Network

GoPong's server is authoritative.  The only thing sent from a connected client to the server is input,
which is validated on the server for safety.  State information is sent to clients every update tick on
the server.

Inputs sent have an incrementing index set by the client.  The server will tell each individual client
what the last index seen from them was when sending a state update.  This allows the client to replay
unacknowledged inputs for client side prediction and server reconciliation.

For testing purposes, client side prediction and server reconciliation can be toggled on/off on the front
end.  The back end doesn't care what the front end does in this regard.

## Lag Simulation

The front end uses a simple wrapper around its websocket connection to introduce configurable lag for
testing and development purposes.

## Lobby and Instances

The Go server implements a naive lobby that simply waits for two clients to connect to start a game.
When either client disconnects, the game is over and will no longer run.  Currently there is no limit
to the total number of games that may be played; that's obviously a bad idea for a production game,
but for now it's a TODO to improve the lobby.

Once two clients have connected and been shipped off to a new instance, the lobby will wait for new
clients to connect and continue the process indefinitely.

## Client Connection

To connect, a client must send a GET to `/connect`.  An upgrade request will be sent, and if successful,
messages will begin to flow as described below.

## Web socket protocol

All messages sent via WebSocket will be encoded in JSON for simplicity.  **Note:** for future
performance/optimization this is likely better served with a binary protocol to drastically
cut down on network traffic.  This is just simpler for now.

The only messages a client can send to the server is input.  The server is completely authoritative.

The first message sent back to the client immediately describes the game they are joining.

```json
{
    "paddleHeight": 0.2,
    "paddleSpeedPerSecond": 0.5,
    "ballRadius": 0.1
}
```

Each subsequent message is the full state of the game encoded in JSON.  The schema contains extremely
short names for bandwidth reasons.  Comments have been added below for clarity.

```javascript
{
    // The state type as defined in the enum server side in lib/state/message/state.go
    "t": 0,

    // The last input index received by the server.  Used for server reconciliation and
    // client side prediction.
    "n": 381,

    // Contains the state information.  This is different per state type, and each
    // state must know how to serialize itself on the back end and deserialize
    // itself on the front end.  In this example, a Play state message is shown.
    "s": {
        // Left paddle
        "pL": {
            // Center
            "c": 0.5,
        },

        // Right paddle
        "pR": {
            "c": 0.5,
        },

        // Ball
        "b": {
            // Center X coordinate
            "x": 0.3,

            // Center Y coordinate
            "y": 0.853,
        }
    }
}
```

For an example with another state:

```javascript
{
    // This time we're using the Starting state
    "t": 1,
    "n": 18,
    "s": {
        // The time remaining in milliseconds
        "r": 381
    }
}
```

The client's input messages sent to the server are in the following schema:

```javascript
{
    // The movement axis in the range of [-1,1]
    "m": 1.0,

    // The duration of the input, in seconds
    "d": 0.03,

    // The input index
    "n": 5814
}
```