import { IRenderTarget } from '../../../graphics/renderTarget';
import { InputStep } from '../../../store/input';
import { IState } from '../state';
import { IMessageStateStarting } from './networkTypes';

export class StateStarting implements IState {
    private remainingMilliseconds: number | null = null;

    public step(durationMilliseconds: number) {
        if (!this.remainingMilliseconds) {
            return;
        }

        this.remainingMilliseconds -= durationMilliseconds * 1000;

        if (this.remainingMilliseconds < 0) {
            this.remainingMilliseconds = 0;
        }
    }

    public applyServerUpdate(msg: any): void {
        const parsed = msg as IMessageStateStarting;

        this.remainingMilliseconds = parsed.r;
    }

    public applyInput(_: InputStep): void {
        // Do nothing
    }

    public draw(renderTarget: IRenderTarget): void {
        if (this.remainingMilliseconds) {
            renderTarget.text((this.remainingMilliseconds * 0.001).toFixed(1), 0.1, 0.9);
        }
    }
}
