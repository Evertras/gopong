# gopong

[![Build Status](https://travis-ci.org/Evertras/gopong.svg?branch=master)](https://trapis-ci.org/Evertras/gopong)

A simple game of multiplayer Pong in HTML with a Go server backing it.

Note: the `vendor` folder is checked in intentionally, but in a 'real' project this should
be handled better by the build system.  For this, it's fine.

## Running

`make run` will generate static content into the build and run the server.

If you don't have `make`, do `go run ./cmd/gopong/main.go` to run.  You'll need to do
`go generate ./lib/static/` beforehand if you make any changes in the `static` folder.

## Playfield

The playfield is an X/Y coordinate system where positive X points to the right and positive Y
points down.  The coordinate `0, 0` is located in the top left and `1, 1` is located in the
bottom right.  The playfield itself is square.

## Configurable values

Configurable values are set by the server.  Any configurable value must be communicated to the clients
at the start of the game.

## Paddles

The paddles are a configurable height, with a default of 0.2.  Movement is done with the arrow keys at
a configurable speed that defaults to 0.5/sec.

## Ball

The ball will slowly speed up over time with each paddle hit.  Its initial speed is 0.05/sec, and each paddle
hit will increase it by 0.02/sec.  These values are configurable.

## Connecting

To connect, a client must send a GET to `/connect`.  An upgrade request will be sent, and if successful,
messages will begin to flow as described below.

## Web socket protocol

The server has a configurable tick rate that defaults to 20 Hz.  Each message is the full state of the game
encoded in JSON.
