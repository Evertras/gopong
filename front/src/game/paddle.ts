import { InputState } from "./input";
import { PaddleMessage } from "../network/types";

export class Paddle {
    public center: number = 0.5;
    public height: number;
    public maxSpeedPerSecond: number;
    public isPlayer: boolean;

    constructor(height: number, maxSpeedPerSecond: number, isPlayer: boolean) {
        this.height = height;
        this.maxSpeedPerSecond = maxSpeedPerSecond;
        this.isPlayer = isPlayer;
    }

    step(deltaSeconds: number, input: InputState): void {
        if (this.isPlayer) {
            if (input.up) {
                this.center -= this.maxSpeedPerSecond * deltaSeconds;
            }

            if (input.down) {
                this.center += this.maxSpeedPerSecond * deltaSeconds;
            }
        }
    }

    public applyServerUpdate(paddleState: PaddleMessage) {
        this.center = paddleState.c;
    }
}