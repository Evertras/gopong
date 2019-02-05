import { SquareRenderTarget } from '../graphics/renderTarget';

export interface IDrawable {
    draw(renderTarget: SquareRenderTarget): void;
}
