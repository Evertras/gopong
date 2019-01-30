import { PaddleMessage } from "./networkTypes";
import { Drawable } from "./drawable";
import { SquareRenderTarget } from "../graphics/renderTarget";

export enum PaddleSide {
    Left,
    Right
}

export class Paddle implements Drawable {
    public center: number = 0.5;
    public height: number;
    public maxSpeedPerSecond: number;
    public isPlayer: boolean;
    public side: PaddleSide;

    constructor(height: number, maxSpeedPerSecond: number, side: PaddleSide, isPlayer: boolean) {
        this.height = height;
        this.maxSpeedPerSecond = maxSpeedPerSecond;
        this.isPlayer = isPlayer;
        this.side = side;
    }

    public applyServerUpdate(paddleState: PaddleMessage) {
        this.center = paddleState.c;
    }

    public draw(renderTarget: SquareRenderTarget) {
        // Dealing with [0,1] coordinates
        const width = 0.03;
        const height = this.height;
        const x = this.side === PaddleSide.Left ? 0 : 1-width;
        const y = this.center - height*0.5;

        renderTarget.rect(x, y, width, height);
    }
}
