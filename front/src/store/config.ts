import { gopongmsg } from '../../../messages/tsmessage/messages';

export class StoreConfig {
    public clientSidePredictionEnabled: boolean = false;
    public serverReconciliationEnabled: boolean = false;
    public paddleHeight: number = 0.2;
    public paddleWidth: number = 0.1;
    public paddleMaxSpeedPerSecond: number = 0.1;
    public ballRadius: number  = 0.02;
    public side: gopongmsg.Server.Config.PaddleSide = gopongmsg.Server.Config.PaddleSide.SIDE_LEFT;

    public updateFromMessage(msg: gopongmsg.Server.IConfig) {
        if (msg.ballRadius) {
            this.ballRadius = msg.ballRadius;
        }

        if (msg.paddleHeight) {
            this.paddleHeight = msg.paddleHeight;
        }

        if (msg.paddleWidth) {
            this.paddleWidth = msg.paddleWidth;
        }

        if (msg.maxPaddleSpeedPerSecond) {
            this.paddleMaxSpeedPerSecond = msg.maxPaddleSpeedPerSecond || 0.1;
        }

        console.log(msg.side);

        if (msg.side) {
            this.side = msg.side;
        }
    }
}
