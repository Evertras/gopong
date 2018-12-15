# gopong

[![Build Status](https://travis-ci.org/Evertras/gopong.svg?branch=master)](https://trapis-ci.org/Evertras/gopong)

A simple game of multiplayer Pong in HTML with a Go server backing it.

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

The paddle can be referenced as either `1` or `2`, with `1` on the left and `2` on the right.

## Ball

The ball will slowly speed up over time with each paddle hit.  Its initial speed is 0.05/sec, and each paddle
hit will increase it by 0.02/sec.  These values are configurable.

## Web socket protocol

Uses a simple protocol that's just space delimited text.  Each message is separated by a new line.

```
join 1
join 2
pos 1 0.4
pos 2 0.4
pos 1 0.4
pos 2 0.53
```

The server has a configurable tick rate that defaults to 20 Hz.  Position information will be sent on each tick for both paddles and the ball.

The following messages are sent:

### Join

```
join
```

The `join` message is sent by the client and indicates that the client would like to join the game.

### Joined

```
joined <side> <paddleHeight> <paddleSpeed> <ballSpeed> <ballIncrease>
```

The `joined` message is sent by the server and contains all configuration information about gameplay
that the client needs to know.  The `side` parameter is either `1` or `2` and indicates the side that
the client is controlling.

### Paddle position

```
paddle <side> <center> <speed>

paddle 1 0.358 -0.2
```

The `player` is either `1` or `2`.

The `center` is a value from 0 to 1 that indicates the center of the player's paddle in terms of a
percentage of the height of the playfield.  For example, a value of `0.5` would indicate the player's
paddle is precisely in the center.  Since the player's paddle has a height component to it, this
value will technically range from `[paddleHeight/2, 1 - paddleHeight/2]`.

The `speed` is the current speed of the paddle.  When positive, the paddle is moving down.  When negative,
the paddle is moving up.  When 0, the paddle is stationary.  The client should use this value to interpolate
paddle movement between ticks.

When sent by the server, this indicates the player's authoritative position/speed.  When sent by the client,
this indicates the client's desired position/speed.  The server will only contradict the client if the difference
is noticeable to prevent cheating while allowing relatively smooth controls for the client.

### Ball position

```
ball <x> <y> <xVel> <yVel>

ball 0.4 0.85 0.03 0.048
```

This message indicates the authoritative position and velocity of the ball.

For example, a message with `0.5 0.75 0.03 0.048` indicates the ball is precisely in the center for its X coordinate
and 75% of the way to the bottom for its Y coordinate, and it is moving at a speed of 0.03 in the X direction and 0.048
in the Y direction.  The client should use the velocity to interpolate the ball's position between ticks.
