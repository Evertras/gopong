import { Input } from '../input/input';
import { KeyCode } from '../input/keyCodes';

export interface InputStep {
    /**
     * How long the input was applied for, in seconds
     */
    durationSeconds: number;

    /**
     * The amount to move up (negative) or down (positive) in the range [-1,1]
     */
    movementAxis: number;

    /**
     * The incrementing index of the input for ordering purposes
     */
    index: number;

    /**
     * Toggles client side prediction on and off.  Active for one frame only.
     */
    toggleClientPredictionPressed: boolean;

    /**
     * Toggles server reconcilization on and off.  Active for one frame only.
     */
    toggleServerReconciliationPressed: boolean;
}

export enum Keys {
    Up = 0,
    Down,
    ToggleClientPrediction,
    ToggleServerReconciliation,
}

export class InputStore {
    private buffer: InputStep[] = [];
    private index: number = 0;
    private lastTime: number = Date.now();

    private input: Input;

    constructor(input: Input) {
        this.input = input;

        this.input.add(Keys.Up, [KeyCode.W, KeyCode.UP]);
        this.input.add(Keys.Down, [KeyCode.S, KeyCode.DOWN]);
        this.input.add(Keys.ToggleClientPrediction, [KeyCode.P]);
        this.input.add(Keys.ToggleServerReconciliation, [KeyCode.R]);
    }

    public step(): InputStep {
        const now = Date.now();
        const duration = this.lastTime - now;
        const inputs = this.input.step();

        let movement = 0;

        if (inputs[Keys.Up].held) {
            movement -= 1;
        }

        if (inputs[Keys.Down].held) {
            movement += 1;
        }

        const inputStep: InputStep = {
            durationSeconds: duration,
            index: this.index++,
            movementAxis: movement,
            toggleClientPredictionPressed: inputs[Keys.ToggleClientPrediction].pressed,
            toggleServerReconciliationPressed: inputs[Keys.ToggleServerReconciliation].pressed,
        };

        this.buffer.push(inputStep);

        return inputStep;
    }

    /**
     * Deletes old input buffers up to and including a given index.
     *
     * @param index The input index to delete up to, inclusive
     */
    public deleteUntil(index: number) {
        let trim = 0;
        while (
            trim < this.buffer.length
            && this.buffer[trim].index <= index
        ) {
            ++trim;
        }

        this.buffer.splice(0, trim);
    }

    public inputBufferLength(): number {
        return this.buffer.length;
    }
}
