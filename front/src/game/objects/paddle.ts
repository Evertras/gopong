import { gopongmsg } from '../../../../messages/tsmessage/messages';
import { IRenderTarget } from '../../graphics/renderTarget';
import { IDrawable } from '../drawable';
import { EntityID } from './entityID';

export class Paddle implements IDrawable {
    public center: number = 0.5;
    public height: number;
    public width: number;
    public maxSpeedPerSecond: number;
    public isPlayer: boolean;
    public side: gopongmsg.Config.PaddleSide;
    public entityID: EntityID = new EntityID();

    constructor(
        height: number,
        width: number,
        maxSpeedPerSecond: number,
        side: gopongmsg.Config.PaddleSide,
        isPlayer: boolean,
     ) {
        this.height = height;
        this.width = width;
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
        const x = this.side === gopongmsg.Config.PaddleSide.SIDE_LEFT ? 0 : 1 - this.width;
        const y = this.center - this.height * 0.5;

        renderTarget.rect(this.entityID.ID, x, y, this.width, this.height);
    }
}
