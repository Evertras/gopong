export interface IPaddleMessage {
    /**
     * The center of the paddle from [0,1]
     */
    c: number;
}

export interface IBallMessage {
    /**
     * The center X coordinate of the ball from [0,1]
     */
    x: number;

    /**
     * The center Y coordinate of the ball from [0,1]
     */
    y: number;
}

export interface IStateMessage {
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

export interface IStatePlayMessage {
    /**
     * Left paddle
     */
    pL: IPaddleMessage;

    /**
     * Right paddle
     */
    pR: IPaddleMessage;

    /**
     * Ball
     */
    b: IBallMessage;
}

export interface IInputMessage {
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
    d: number;
}
