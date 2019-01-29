export interface PaddleMessage {
    c: number;
}

export interface BallMessage {
    x: number;
    y: number;
}

export interface StateMessage {
    pL: PaddleMessage;
    pR: PaddleMessage;
    b: BallMessage;
}

export interface GameConfigMessage {

}
