export interface PaddleMessage {
    c: number;
    s: number;
}

export interface BallMessage {
    pX: number;
    pY: number;
    vX: number;
    vY: number;
}

export interface StateMessage {
    pL: PaddleMessage;
    pR: PaddleMessage;
    b: BallMessage;
}

export interface GameConfigMessage {

}
