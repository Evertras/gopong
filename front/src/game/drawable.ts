import { SquareRenderTarget } from "../graphics/renderTarget";

export interface Drawable {
    draw(renderTarget: SquareRenderTarget) : void;
}
