import { IRenderTarget } from '../../../graphics/renderTarget';
import { StoreConfig } from '../../../store/config';
import { InputStep } from '../../../store/input';
import { IMessageStatePlay } from '../../networkTypes';
import { Ball } from '../../objects/ball';
import { Paddle, PaddleSide } from '../../objects/paddle';
import { IState } from '../state';

/**
 * The main state of the game: actually playing!
 */
export class StatePlay implements IState {
    public paddleLeft: Paddle;
    public paddleRight: Paddle;
    public ball: Ball;

    private storeConfig: StoreConfig;

    constructor(storeConfig: StoreConfig) {
        this.storeConfig = storeConfig;

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

        this.ball = new Ball(this.storeConfig.ballRadius);
    }

    public draw(renderTarget: IRenderTarget) {
        this.paddleLeft.draw(renderTarget);
        this.paddleRight.draw(renderTarget);
        this.ball.draw(renderTarget);
    }

    public applyServerUpdate(msg: string): void {
        const parsed = JSON.parse(msg) as IMessageStatePlay;

        if (!parsed) {
            return;
        }

        this.paddleLeft.applyServerUpdate(parsed.pL);
        this.paddleRight.applyServerUpdate(parsed.pR);
        this.ball.applyServerUpdate(parsed.b);
    }

    public applyInput(inputStep: InputStep) {
        this.paddleLeft.applyMovementInput(
            inputStep.movementAxis,
            inputStep.durationSeconds);
    }

    public step(_: number): IState {
        return this;
    }
}
