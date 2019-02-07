# gopong

[![Build Status](https://travis-ci.org/Evertras/gopong.svg?branch=master)](https://travis-ci.org/Evertras/gopong)

A simple game of multiplayer Pong in HTML with a Go server backing it.

## Build tools

This project uses [dep](https://github.com/golang/dep) to handle its dependencies.

Note: the `vendor` folder is checked in intentionally, but in a 'real' project this should
be handled better by the build system.  For this, it's fine.

This project uses webpack with the stock typescript loaders and a slightly custom tslint pass.

Relevant front end build configuration:

* [package.json]
* [tsconfig.json]
* [tslint.json]
* [webpack.config.js]

Node 8.x was used for development.  It may work on earlier versions, but it's untested.

Good ol' `make` is used for build script consolidation since both Go and Typescript are present.
See [the Makefile](Makefile) for available commands and what they do.

## Entry points

The entry point for the back end server is [cmd/gopong/main.go].

The entry point for the front end is [front/src/main.ts].

## Running development mode

Running `make run-dev` will generate the front end and start the back end server.  The content files will be served
off the disk, so updating the front end will be served without having to restart the server.

## Game System Information

### Playfield

The playfield is an X/Y coordinate system where positive X points to the right and positive Y
points down.  The coordinate `0, 0` is located in the top left and `1, 1` is located in the
bottom right.  The playfield itself is square.

### Paddles

The paddles are a configurable height, with a default of 0.2.  Movement is done with the arrow keys at
a configurable speed that defaults to 0.5/sec.

### Ball

The ball currently follows a simple linear path at a constant speed as configured on the server.

## Networking information

### Client Connection

To connect, a client must send a GET to `/connect`.  An upgrade request will be sent, and if successful,
messages will begin to flow as described below.

### Web socket protocol

All messages sent via WebSocket will be encoded in JSON for simplicity.  **Note:** for future
performance/optimization this is likely better served with a binary protocol to drastically
cut down on network traffic.  This is just simpler for now.

The first message sent back to the client immediately describes the game they are joining.

```json
{
    "config": {
        "paddleHeight": 0.2,
        "paddleSpeedPerSecond": 0.5,
        "ballRadius": 0.1
    }
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