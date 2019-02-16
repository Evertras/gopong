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
            gopongmsg.Config.PaddleSide.SIDE_LEFT,
            true);

        this.paddleRight = new Paddle(
            this.storeConfig.paddleHeight,
            this.storeConfig.paddleWidth,
            this.storeConfig.paddleMaxSpeedPerSecond,
            gopongmsg.Config.PaddleSide.SIDE_RIGHT,
            false);

        if (this.storeConfig.side === gopongmsg.Config.PaddleSide.SIDE_LEFT) {
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

    public applyServerUpdate(msg: gopongmsg.Server.IState): void {
        const play = msg.play;

        if (!play) {
            throw new Error('Tried to apply an update to Play state that isn\'t Play');
        }

        if (play.paddleLeft && play.paddleLeft.center) {
            this.paddleLeft.center = play.paddleLeft.center;
        }

        if (play.paddleRight && play.paddleRight.center) {
            this.paddleRight.center = play.paddleRight.center;
        }

        if (play.ball) {
            this.ball.x = play.ball.centerX || this.ball.x;
            this.ball.y = play.ball.centerY || this.ball.y;
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
