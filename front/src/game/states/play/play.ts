import { gopongmsg } from '../../../../../messages/tsmessage/messages';
import { IRenderTarget } from '../../../graphics/renderTarget';
import { StoreConfig } from '../../../store/config';
import { InputStep } from '../../../store/input';
import { Ball } from '../../objects/ball';
import { Paddle } from '../../objects/paddle';
import { IState } from '../state';

/**
 * The main state of the game: actually playing!
 */
export class StatePlay implements IState {
    private paddleLeft: Paddle;
    private paddleRight: Paddle;
    private ball: Ball;

    // Reference to the active paddle depending on which player this client is
    private paddleActive: Paddle;

    private storeConfig: StoreConfig;

    constructor(storeConfig: StoreConfig) {
        this.storeConfig = storeConfig;

        if (isNaN(this.storeConfig.paddleMaxSpeedPerSecond)) {
            throw new Error('max speed is not number');
        }

        this.paddleLeft = new Paddle(
            this.storeConfig.paddleHeight,
            this.storeConfig.paddleWidth,
            this.storeConfig.paddleMaxSpeedPerSecond,
            gopongmsg.Server.Config.PaddleSide.SIDE_LEFT,
            true);

        this.paddleRight = new Paddle(
            this.storeConfig.paddleHeight,
            this.storeConfig.paddleWidth,
            this.storeConfig.paddleMaxSpeedPerSecond,
            gopongmsg.Server.Config.PaddleSide.SIDE_RIGHT,
            false);

        if (this.storeConfig.side === gopongmsg.Server.Config.PaddleSide.SIDE_LEFT) {
            this.paddleActive = this.paddleLeft;
        } else {
            this.paddleActive = this.paddleRight;
        }

        this.ball = new Ball(this.storeConfig.ballRadius);
    }

    public draw(renderTarget: IRenderTarget) {
        this.paddleLeft.draw(renderTarget);
        this.paddleRight.draw(renderTarget);
        this.ball.draw(renderTarget);
    }

    public applyServerUpdate(msg: any): void {
        const parsed = msg as gopongmsg.Server.State.IPlay;

        if (parsed.paddleLeft && parsed.paddleLeft.center) {
            this.paddleLeft.center = parsed.paddleLeft.center;
        }

        if (parsed.paddleRight && parsed.paddleRight.center) {
            this.paddleRight.center = parsed.paddleRight.center;
        }

        if (parsed.ball) {
            this.ball.x = parsed.ball.centerX || this.ball.x;
            this.ball.y = parsed.ball.centerY || this.ball.y;
        }
    }

    public applyInput(inputStep: InputStep) {
        this.paddleActive.applyMovementInput(
            inputStep.movementAxis,
            inputStep.durationSeconds);
    }

    public step(_: number) {
        // TODO: Entity Interpolation
    }
}
