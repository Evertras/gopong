import { IRenderTarget } from '../graphics/renderTarget';

export interface IDrawable {
    draw(renderTarget: IRenderTarget): void;
}
