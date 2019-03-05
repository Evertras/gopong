import { gopongmsg } from '../../../../../messages/tsmessage/messages';
import { IRenderTarget } from '../../../graphics/renderTarget';
import { InputStep } from '../../../store/input';
import { UIText } from '../../objects/uiText';
import { IState } from '../state';

export class StateStarting implements IState {
    private remainingSeconds: number | null = null;
    private text: UIText = new UIText();

    constructor() {
        this.text.x = 0.1;
        this.text.y = 0.9;
    }

    public step(durationMilliseconds: number) {
        if (!this.remainingSeconds) {
            return;
        }

        this.remainingSeconds -= durationMilliseconds * 0.001;

        if (this.remainingSeconds < 0) {
            this.remainingSeconds = 0;
        }
    }

    public applyServerUpdate(msg: gopongmsg.IState): void {
        const start = msg.start;

        if (!start) {
            throw new Error('Tried to apply server update to Start state without data');
        }

        if (start.secondsRemaining) {
            this.remainingSeconds = start.secondsRemaining;
        }
    }

    public applyInput(_: InputStep): void {
        // Do nothing
    }

    public draw(renderTarget: IRenderTarget): void {
        if (this.remainingSeconds !== null) {
            this.text.text = this.remainingSeconds.toFixed(1);
            this.text.draw(renderTarget);
        }
    }
}
