import { GameObject } from "./gameObject";
import { BallMessage } from "../network/types";

export class Ball implements GameObject {
    public x: number = 0.5;
    public y: number = 0.5;
    public radius: number = 0.1;

    constructor(radius: number) {
        this.radius = radius;
    }

    public applyServerUpdate(ballState: BallMessage) {
        this.x = ballState.pX;
        this.y = ballState.pY;
    }
}
