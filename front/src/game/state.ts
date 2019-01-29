import { Paddle } from "./paddle";
import { Ball } from "./ball";
import { InputState } from "./input";
import { StateMessage } from "../network/types";

export class GameState {
    public paddleLeft: Paddle;
    public paddleRight: Paddle;
    public ball: Ball;

    constructor(paddleHeight: number, paddleMaxSpeedPerSecond: number, ballRadius: number) {
        this.paddleLeft = new Paddle(paddleHeight, paddleMaxSpeedPerSecond, true);
        this.paddleRight = new Paddle(paddleHeight, paddleMaxSpeedPerSecond, false);
        this.ball = new Ball(ballRadius);
    }

    public step(deltaSeconds: number, input: InputState) {
        this.paddleLeft.step(deltaSeconds, input);
        this.paddleRight.step(deltaSeconds, input);
    }

    public applyServerUpdate(serverState: StateMessage) {
        this.paddleLeft.applyServerUpdate(serverState.pL);
        this.paddleRight.applyServerUpdate(serverState.pR);
        this.ball.applyServerUpdate(serverState.b);
    }
}