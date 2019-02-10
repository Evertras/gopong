import { IRenderTarget } from '../../../graphics/renderTarget';
import { StoreConfig } from '../../../store/config';
import { InputStep } from '../../../store/input';
import { Ball } from '../../objects/ball';
import { Paddle, PaddleSide } from '../../objects/paddle';
import { IState } from '../state';
import { IMessageStatePlay } from './networkTypes';

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
            this.storeConfig.paddleMaxSpeedPerSecond,
            PaddleSide.Left,
            true);

        this.paddleRight = new Paddle(
            this.storeConfig.paddleHeight,
            this.storeConfig.paddleMaxSpeedPerSecond,
            PaddleSide.Right,
            false);

        if (this.storeConfig.side === PaddleSide.Left) {
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
        const parsed = msg as IMessageStatePlay;

        this.paddleLeft.center = parsed.pL.c;
        this.paddleRight.center = parsed.pR.c;

        this.ball.x = parsed.b.x;
        this.ball.y = parsed.b.y;
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
