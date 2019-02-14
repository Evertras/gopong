import { gopongmsg } from '../../../../../messages/tsmessage/messages';
import { IRenderTarget } from '../../../graphics/renderTarget';
import { InputStep } from '../../../store/input';
import { IState } from '../state';

export class StateStarting implements IState {
    private remainingSeconds: number | null = null;

    public step(durationMilliseconds: number) {
        if (!this.remainingSeconds) {
            return;
        }

        this.remainingSeconds -= durationMilliseconds * 0.001;

        if (this.remainingSeconds < 0) {
            this.remainingSeconds = 0;
        }
    }

    public applyServerUpdate(msg: any): void {
        const parsed = msg as gopongmsg.Server.State.IStart;

        if (parsed.secondsRemaining) {
            this.remainingSeconds = parsed.secondsRemaining;
        }
    }

    public applyInput(_: InputStep): void {
        // Do nothing
    }

    public draw(renderTarget: IRenderTarget): void {
        if (this.remainingSeconds !== null) {
            renderTarget.text(this.remainingSeconds.toFixed(1), 0.1, 0.9);
        }
    }
}
