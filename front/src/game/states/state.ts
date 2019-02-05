import { IRenderTarget } from '../../graphics/renderTarget';
import { InputStep } from '../../store/input';

export interface IState {
    /**
     * Steps forward a frame, returning the state the game should now be in (usually itself).
     *
     * @param durationSeconds How long to step forward, in fractional seconds
     */
    step(durationSeconds: number): IState;

    /**
     * Applies an update supplied by the server for this state.
     *
     * @param msg The JSON encoded state sent from the server
     */
    applyServerUpdate(msg: string): void;

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
