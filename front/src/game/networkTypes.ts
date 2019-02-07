
export interface IMessageState {
    /**
     * The inner state data of the game.  Each state should know
     * its own schema and type cast accordingly.
     */
    s: any;

    /**
     * The last input index received by this client for this state
     */
    n: number;
}

/**
 * Input messages to send to the server
 */
export interface IMessageInput {
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
