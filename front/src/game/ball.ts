import { BallMessage } from "./networkTypes";
import { Drawable } from "./drawable";
import { SquareRenderTarget } from "../graphics/renderTarget";

export class Ball implements Drawable {
    public x: number = 0.5;
    public y: number = 0.5;
    public radius: number = 0.1;

    constructor(radius: number) {
        this.radius = radius;
    }

    public applyServerUpdate(ballState: BallMessage) {
        this.x = ballState.x;
        this.y = ballState.y;
    }

    public draw(renderTarget: SquareRenderTarget) {
        renderTarget.circle(this.x, this.y, this.radius);
    }
}
