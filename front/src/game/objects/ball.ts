import { IRenderTarget } from '../../graphics/renderTarget';
import { IDrawable } from '../drawable';

export class Ball implements IDrawable {
    public x: number = 0.5;
    public y: number = 0.5;
    public radius: number = 0.1;

    constructor(radius: number) {
        this.radius = radius;
    }

    public draw(renderTarget: IRenderTarget) {
        renderTarget.circle(this.x, this.y, this.radius);
    }
}
