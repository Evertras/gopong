/**
 * An ID for a state.  Explicitly set to match the server's definitions, do not edit!
 */
export enum StateType {
    StateTypePlay = 0,
    StateTypeStarting = 1,
}

export interface IMessageState {
    /**
     * The inner state data of the game.  Each state should know
     * its own schema and type cast accordingly.
     */
    s: any;

    /**
     * The last input index received by this client.
     */
    n: number;

    /**
     * The state this message is defining.
     */
    t: StateType;
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
