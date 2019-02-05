import { IRenderTarget } from '../../graphics/renderTarget';
import { IDrawable } from '../drawable';
import { IMessageBall } from '../networkTypes';

export class Ball implements IDrawable {
    public x: number = 0.5;
    public y: number = 0.5;
    public radius: number = 0.1;

    constructor(radius: number) {
        this.radius = radius;
    }

    public applyServerUpdate(ballState: IMessageBall) {
        this.x = ballState.x;
        this.y = ballState.y;
    }

    public draw(renderTarget: IRenderTarget) {
        renderTarget.circle(this.x, this.y, this.radius);
    }
}
