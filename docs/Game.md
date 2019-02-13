# Game System Information

Oh right, there's a game in here somewhere...

## Playfield

The playfield is an X/Y coordinate system where positive X points to the right and positive Y
points down.  The coordinate `0, 0` is located in the top left and `1, 1` is located in the
bottom right.  The playfield itself is square.

## Paddles

The paddles are a configurable height, with a default of 0.2.  Movement is done with the arrow keys at
a configurable speed that defaults to 0.5/sec.

## Ball

The ball currently follows a simple linear path at a constant speed as configured on the server.