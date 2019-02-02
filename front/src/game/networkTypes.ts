export interface PaddleMessage {
    /**
     * The center of the paddle from [0,1]
     */
    c: number;
}

export interface BallMessage {
    /**
     * The center X coordinate of the ball from [0,1]
     */
    x: number;

    /**
     * The center Y coordinate of the ball from [0,1]
     */
    y: number;
}

export interface StateMessage {
    /**
     * The inner state data of the game, which is itself a JSON serialized object that depends on
     * the type of state to determine its schema.
     */
    s: string;

    /**
     * The last input index received by this client for this state
     */
    n: number;
}

export interface StatePlayMessage {
    /**
     * Left paddle
     */
    pL: PaddleMessage;

    /**
     * Right paddle
     */
    pR: PaddleMessage;

    /**
     * Ball
     */
    b: BallMessage;
}

export interface InputMessage {
    /**
     * Movement axis from [-1,1]
     */
    m: number;

    /**
     * Index of the input
     */
    n: number;

    /**
     * How long the input lasted, in seconds
     */
    d: number
}