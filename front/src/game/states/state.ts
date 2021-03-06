import { gopongmsg } from '../../../../messages/tsmessage/messages';
import { IRenderTarget } from '../../graphics/renderTarget';
import { InputStep } from '../../store/input';

export interface IState {
    /**
     * Steps forward a frame
     *
     * @param durationMilliseconds How long to step forward, in milliseconds
     */
    step(durationMilliseconds: number): void;

    /**
     * Applies an update supplied by the server for this state.  The state should know
     * how to find its own state message.
     *
     * @param msg The state message received by the server.
     */
    applyServerUpdate(msg: gopongmsg.IState): void;

    /**
     * Apply input to the state.  Used for client side prediction and server reconciliation.
     *
     * @param inputStep The input to apply
     */
    applyInput(inputStep: InputStep): void;

    /**
     * Draws the current state to a given render target.
     *
     * @param renderTarget The render target to draw to.
     */
    draw(renderTarget: IRenderTarget): void;
}
