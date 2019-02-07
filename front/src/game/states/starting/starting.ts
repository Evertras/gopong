import { IRenderTarget } from '../../../graphics/renderTarget';
import { InputStep } from '../../../store/input';
import { IState } from '../state';

export interface IMessageStateStarting {
    /**
     * How much time is remaining, in milliseconds
     */
    r: number;
}

export class StateStarting implements IState {
    private remainingMilliseconds: number;

    constructor(initialMilliseconds: number) {
        this.remainingMilliseconds = initialMilliseconds;
    }

    public step(durationMilliseconds: number) {
        this.remainingMilliseconds -= durationMilliseconds * 1000;
    }

    public applyServerUpdate(msg: any): void {
        const parsed = msg as IMessageStateStarting;

        this.remainingMilliseconds = parsed.r;
    }

    public applyInput(_: InputStep): void {
        // Do nothing
    }

    public draw(renderTarget: IRenderTarget): void {
        renderTarget.text((this.remainingMilliseconds * 0.001).toFixed(1), 0.1, 0.9);
    }

}
