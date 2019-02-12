import { IMessageClientConfig, ServerPaddleSide } from '../network/messageTypes';

export class StoreConfig {
    public clientSidePredictionEnabled: boolean = false;
    public serverReconciliationEnabled: boolean = false;
    public paddleHeight: number = 0.2;
    public paddleWidth: number = 0.1;
    public paddleMaxSpeedPerSecond: number = 0.1;
    public ballRadius: number  = 0.02;
    public side: ServerPaddleSide = ServerPaddleSide.Left;

    public updateFromMessage(msg: IMessageClientConfig) {
        this.ballRadius = msg.gameConfig.ballRadius;
        this.paddleHeight = msg.gameConfig.paddleHeight;
        this.paddleWidth = msg.gameConfig.paddleWidth;
        this.paddleMaxSpeedPerSecond = msg.gameConfig.paddleMaxSpeedPerSecond;
        this.side = msg.playerSide;
    }
}
