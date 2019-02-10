import { IMessageConfig } from '../game/networkTypes';
import { PaddleSide } from '../game/objects/paddle';

export class StoreConfig {
    public clientSidePredictionEnabled: boolean = false;
    public serverReconciliationEnabled: boolean = false;
    public paddleHeight: number = 0.2;
    public paddleMaxSpeedPerSecond: number = 0.1;
    public ballRadius: number  = 0.02;
    public side: PaddleSide = PaddleSide.Left;

    public updateFromMessage(msg: IMessageConfig) {
        this.ballRadius = msg.config.ballRadius;
        this.paddleHeight = msg.config.paddleHeight;
        this.paddleMaxSpeedPerSecond = msg.config.paddleMaxSpeedPerSecond;
        this.side = msg.config.side;
    }
}
