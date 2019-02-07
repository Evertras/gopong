export interface IMessagePaddle {
    /**
     * The center of the paddle from [0,1]
     */
    c: number;
}

export interface IMessageBall {
    /**
     * The center X coordinate of the ball from [0,1]
     */
    x: number;

    /**
     * The center Y coordinate of the ball from [0,1]
     */
    y: number;
}

export interface IMessageStatePlay {
    /**
     * Left paddle
     */
    pL: IMessagePaddle;

    /**
     * Right paddle
     */
    pR: IMessagePaddle;

    /**
     * Ball
     */
    b: IMessageBall;
}
