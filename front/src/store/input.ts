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

export class InputStore {
    private inputBuffer: InputStep[] = [];
    // private index: number = 0;
    // private lastTime: number = Date.now();
    // private raw: InputRaw = new InputRaw();

    /*
    public step() : InputStep {
        const now = Date.now();
        const duration = this.lastTime - now;

        let movement = 0;

        if (this.raw.up.held) {
            movement -= 1;
        }

        if (this.raw.down.held) {
            movement += 1;
        }

        const inputStep: InputStep = {
            durationSeconds: duration,
            index: this.index++,
            movementAxis: movement,
            toggleClientPredictionPressed: this.raw.toggleClientPrediction.pressed,
            toggleServerReconciliationPressed: this.raw.toggleServerReconciliation.pressed,
        };

        this.inputBuffer.push(inputStep);

        return inputStep;
    }
    */

    /**
     * Deletes old input buffers up to and including a given index.
     *
     * @param index The input index to delete up to, inclusive
     */
    public deleteUntil(index: number) {
        let trim = 0;
        while (
            trim < this.inputBuffer.length
            && this.inputBuffer[trim].index <= index
        ) {
            ++trim;
        }

        this.inputBuffer.splice(0, trim);
    }

    public inputBufferLength(): number {
        return this.inputBuffer.length;
    }

    /*
    public thing() {
        const keyHandler = (evt: KeyboardEvent) => {
            // Up/W
            if (evt.keyCode == 38 || evt.keyCode == 87) {
                game.inputUp(evt.type == "keydown");
            }

            // Down/S
            if (evt.keyCode == 40 || evt.keyCode == 83) {
                game.inputDown(evt.type == "keydown");
            }

            // P
            if (evt.keyCode == 80 && evt.type == "keyup") {
                game.inputToggleClientSidePrediction();
            }

            // R
            if (evt.keyCode == 82 && evt.type == "keyup") {
                game.inputToggleServerReconciliation();
            }
        };

        document.body.onkeydown = keyHandler;
        document.body.onkeyup = keyHandler;
    }
    */
}
