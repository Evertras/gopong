/* THIS FILE IS AUTOMATICALLY GENERATED, DO NOT EDIT */

export interface IMessagePlayState {
    /**
     * The left paddle
     */
    pL: IMessagePlayPaddle;
    /**
     * The right paddle
     */
    pR: IMessagePlayPaddle;
    /**
     * The ball
     */
    b: IMessagePlayBall;
}

export interface IMessagePlayPaddle {
    /**
     * The center of the paddle in [0,1] coordinates
     */
    c: number;
}

export interface IMessagePlayBall {
    /**
     * The center X coordinate of the ball in [0,1] coordinates
     */
    x: number;
    /**
     * The center Y coordinate of the ball in [0,1] coordinates
     */
    y: number;
}