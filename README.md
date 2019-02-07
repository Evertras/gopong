# gopong

[![Build Status](https://travis-ci.org/Evertras/gopong.svg?branch=master)](https://travis-ci.org/Evertras/gopong)

A simple game of multiplayer browser Pong in Typescript with a Go server backing it.

## Build tools

Click the build badge at the top for Travis CI information.

This project uses [dep](https://github.com/golang/dep) to handle its dependencies. Note that the
`vendor` folder is checked in intentionally, but in a 'real' project this should probably be
handled better by the build system.  For this, it's fine.

This project uses webpack with the stock typescript loader and a slightly tweaked tslint config.

Relevant front end build configuration:

* [package.json](package.json)
* [tsconfig.json](tsconfig.json)
* [tslint.json](tslint.json)
* [webpack.config.js](webpack.config.js)

Node 8.x was used for development.  It may work on earlier versions, but it's untested.

Good ol' `make` is used for build script consolidation since both Go and Typescript are present.
See [the Makefile](Makefile) for available commands and what they do.

If you need `make` for windows, [you can get it here](http://gnuwin32.sourceforge.net/packages/make.htm).

## Test tools

To run all tests, run `make test`.  See [the Makefile](Makefile) for more information.

Go just uses the stock Go testing libraries included with Go.  Run `go test -v ./...` to run all Go tests.

Typescript uses Mocha, Chai, and Sinon.  Running `npm test` will run all Typescript tests.

## Entry points

Where to go to get started in the code.

The development entry point for the back end server is [cmd/gopong/main.go].

The development entry point for the front end is [front/src/main.ts].

## Running in development mode

Running `make run-dev` will generate the front end and start the back end server.  The content files will be served
off the disk, so updating the front end will be served without having to restart the server.

Once running, the game is available at [http://localhost:8000](http://localhost:8000) and will connect automatically once loaded.

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

The Go server implements a naive lobby that simply waits for two clients to connect to start a game.
When either client disconnects, the game is over and will no longer run.  Currently there is no limit
to the total number of games that may be played; that's obviously a bad idea for a production game,
but for now it's a TODO to improve the lobby..

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

## Metrics

The Go server emits statsd metrics.  For development, a TICK stack is
available via Docker Compose in the [tick](tick) directory.  Note that
Telegraf is commented out for now because Windows... instead you'll
have to run an actual Telegraf executable locally using the config in
[the etc directory](tick/etc/telegraf.conf).

```bash
cd ./tick/

# This will start the ICK part of TICK
docker-compose up -d

# In Windows
telegraf.exe --config etc/telegraf.conf

# In Linux
telegraf --config etc/telegraf.conf
```

After running the Gopong server for more than a few seconds, you can then
visit [Chronograf](http://localhost:8888) at http://localhost:8888 to see metrics.
