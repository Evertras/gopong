import { IRenderTarget } from '../../graphics/renderTarget';
import { IDrawable } from '../drawable';
import { EntityID } from './entityID';

export class UIText implements IDrawable {
    public entityID: EntityID = new EntityID();
    public text: string = '';
    public x: number = 0;
    public y: number = 0;

    public draw(renderTarget: IRenderTarget): void {
        renderTarget.text(this.entityID.ID, this.text, this.x, this.y);
    }
}
