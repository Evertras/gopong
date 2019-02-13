# gopong

[![Build Status](https://travis-ci.org/Evertras/gopong.svg?branch=master)](https://travis-ci.org/Evertras/gopong)

A simple game of multiplayer browser Pong in Typescript with a Go server backing it.

The Go server is completely self-contained as a single binary for easy distribution; no separate
content is required.  The pages and javascript files being served to the browser are baked into
the executable via `go generate ./lib/static` creating a `build.go` file in the [lib/static](lib/static)
directory.  When run with the `-d` flag, files are served directly from disk to allow for an easier
development workflow.

Note that this entire project is **complete overkill** for Pong.  Even this documentation is overkill.
The point is to have a robust example of a multiplayer game that uses both Typescript and Go and
meets the following self-imposed requirements:

* Easy to develop/maintain
  * Code follows good practices and is extensible for new features
  * Tests are relatively painless to add and maintain to enable/encourage TDD where appropriate
  * Tests exist where reasonable so changes can be made confidently
  * A development mode flag and webpack's watch mode make front end development frictionless - automatic rebuild for every save and a simple refresh in the browser to reload with the updated code
* Easy to build
  * As few global installs as possible (no npm install -g!)
  * CI should be essentially configless outside of stock Go and NodeJS installs
  * Everything should just work out of the box on any machine after cloning the repo
* Easy to distribute
  * Everything is self-contained into a single binary
    * Extremely lightweight containerization is trivial due to zero runtime dependencies; NodeJS runtime isn't required
    * Packaging a single executable binary is the simplest use case for any other package system if desired
* Easy to monitor
  * Emits metrics in a standard fashion that existing tools can read (statsd)
  * Adding metrics is easy, to encourage more monitoring

## Development prerequisites

### Minimum requirements

The following is required to build this project.

* [Go 1.11](https://golang.org/doc/install)
* [Node 8.x](https://nodejs.org/en/)

Older versions may work, but GLHF because you're on your own.  Newer versions should be fine.

### Optional requirements

#### Go Dep

If you add, update, or remove any third party Go dependencies, you'll need to update the vendor
folder by using [Go Dep](https://github.com/golang/dep).  This is not necessary to install otherwise.

#### Make

If you want to take advantage of the Makefile, you'll need `make` installed on your system.
This isn't necessary for development as all commands from the Makefile can be run manually, but it
does make things easier.

If you need `make` for Linux because it's somehow not on your system, see your distribution's resources
to find what package you need to install.

If you need `make` for Windows, [you can get it here](http://gnuwin32.sourceforge.net/packages/make.htm).

You should now be able to just run `make` in the root directory of this repository to test and
build everything with a `gopong` executable artifact created for your system.

#### Docker Compose and Telegraf

If you want to use the supplied TICK stack for seeing metrics while developing, you'll need
[Docker Compose](https://docs.docker.com/compose/) and potentially
[Telegraf](https://portal.influxdata.com/downloads/) if you're on Windows and can't get the
UDP ports in the docker compose to work.

## Building

### TLDR

```bash
make
```

### Details

This project uses [Go Dep](https://github.com/golang/dep) to handle its Go dependencies. Note that the
`vendor` folder is checked in intentionally, but in a 'real' project this should probably be
handled better by the build system.  For this, it's fine.

This project uses [webpack](https://webpack.js.org/) with the
[stock typescript loader](https://github.com/TypeStrong/ts-loader) and a slightly tweaked tslint config.

Relevant front end build configuration:

* [package.json](package.json)
* [tsconfig.json](tsconfig.json)
* [tslint.json](tslint.json)
* [webpack.config.js](webpack.config.js)

Good ol' `make` is used for build script consolidation since both Go and Typescript are present.
See [the Makefile](Makefile) for available commands and what they do.

### Typescript Linting

See [tslint.json](tslint.json) for Typescript linter settings.

Running `npx tslint -p . --fix` will fix most Typescript linting errors.  This script has also
been added as `npm run-script lint-fix`.  Most editors will have a plugin of some sort that
will run the linter for you as well, and potentially even fix errors on save.

### Travis CI

The build badge at the top of this README will take you to the Travis CI page for this project.
Travis CI simply runs `make` which will run all tests to ensure everything is correct.

### Docker

`make docker` will create a Docker image named `evertras/gopong`.  This image is based off `scratch`,
making it very tiny (<10 mb) but without access to a shell to exec into while running.  See [Dockerfile](Dockerfile)
for details.

## Test tools

To run all tests, run `make test`.  See [the Makefile](Makefile) for more information.

Go just uses the stock Go testing libraries included with Go.  Run `go test -v ./...` to run all Go tests.

Typescript uses [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/), and [Sinon](https://sinonjs.org/).
Running `npm test` will run all Typescript tests.

## Code Entry points

The code entry point for the back end is [cmd/gopong/main.go](cmd/gopong/main.go).

The code entry point for the front end is [front/src/main.ts](front/src/main.ts).

## Running in development mode

Running `make run-dev` will generate the front end and start the back end server.  The content
files will be served off the disk, so updating the front end will be served without having to
restart the server.  This will also run go with the `-race` flag, which will write to the
console when any race conditions are detected during a run.  Any detected race conditions are
unacceptable and must be fixed immediately.

Running `npx webpack -w` in another terminal will automatically regenerate the javascript being
served whenever a typescript file is edited.

Once running, the game is available at [http://localhost:8000](http://localhost:8000) and will
connect automatically once loaded.

## Game System Information

Oh right, there's a game in here somewhere...

### Playfield

The playfield is an X/Y coordinate system where positive X points to the right and positive Y
points down.  The coordinate `0, 0` is located in the top left and `1, 1` is located in the
bottom right.  The playfield itself is square.

### Paddles

The paddles are a configurable height, with a default of 0.2.  Movement is done with the arrow keys at
a configurable speed that defaults to 0.5/sec.

### Ball

The ball currently follows a simple linear path at a constant speed as configured on the server.

## Networking

GoPong's server is authoritative.  The only thing sent from a connected client to the server is input,
which is validated on the server for safety.  State information is sent to clients every update tick on
the server.

Inputs sent have an incrementing index set by the client.  The server will tell each individual client
what the last index seen from them was when sending a state update.  This allows the client to replay
unacknowledged inputs for client side prediction and server reconciliation.

For testing purposes, client side prediction and server reconciliation can be toggled on/off on the front
end.  The back end doesn't care what the front end does in this regard.

### Lag Simulation

The front end uses a simple wrapper around its websocket connection to introduce configurable lag for
testing and development purposes.

### Lobby and Instances

The Go server implements a naive lobby that simply waits for two clients to connect to start a game.
When either client disconnects, the game is over and will no longer run.  Currently there is no limit
to the total number of games that may be played; that's obviously a bad idea for a production game,
but for now it's a TODO to improve the lobby.

Once two clients have connected and been shipped off to a new instance, the lobby will wait for new
clients to connect and continue the process indefinitely.

### Client Connection

To connect, a client must send a GET to `/connect`.  An upgrade request will be sent, and if successful,
messages will begin to flow as described below.

### Web socket protocol

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

## Metrics

The Go server emits statsd metrics.  For development, a TICK stack is
available via [Docker Compose](https://docs.docker.com/compose/) in
the [tick](tick) directory.  Note that Telegraf is commented out for
now because Windows hates exposing UDP... instead you'll have to run
an actual Telegraf executable locally using the config in
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
visit [Chronograf](http://localhost:8888) at http://localhost:8888 to explore
all available metrics.
