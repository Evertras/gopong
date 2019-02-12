import { IRenderTarget } from '../../graphics/renderTarget';
import { ServerPaddleSide } from '../../network/messageTypes';
import { IDrawable } from '../drawable';

export class Paddle implements IDrawable {
    public center: number = 0.5;
    public height: number;
    public maxSpeedPerSecond: number;
    public isPlayer: boolean;
    public side: ServerPaddleSide;

    constructor(height: number, maxSpeedPerSecond: number, side: ServerPaddleSide, isPlayer: boolean) {
        this.height = height;
        this.maxSpeedPerSecond = maxSpeedPerSecond;
        this.isPlayer = isPlayer;
        this.side = side;
    }

    public applyMovementInput(direction: number, durationSeconds: number) {
        this.center += direction * durationSeconds * this.maxSpeedPerSecond;

        // Bound to play area
        const halfHeight = this.height * 0.5;

        if (this.center + halfHeight > 1) {
            this.center = 1 - halfHeight;
        }

        if (this.center - halfHeight < 0) {
            this.center = halfHeight;
        }
    }

    public draw(renderTarget: IRenderTarget) {
        // Dealing with [0,1] coordinates
        const width = 0.03;
        const height = this.height;
        const x = this.side === ServerPaddleSide.Left ? 0 : 1 - width;
        const y = this.center - height * 0.5;

        renderTarget.rect(x, y, width, height);
    }
}