import { KeyState } from "./keyState";
import { KeyCode } from "./keyCodes";

/**
 * A unique numerical identifier for an input.  This should be defined
 * as a constant enum somewhere for the game, such as MoveUp = 1, etc.
 */
export type InputID = number;

export type InputIDToStateMap = { [key:number]:KeyState; };
type KeyCodeToStateMap = { [key:string]:KeyState; };

export class Input {
    // Maps key codes to key states
    private keyMap: KeyCodeToStateMap = {};

    // Maps a unique InputID to a key state for that ID
    private keyStates: InputIDToStateMap = {};

    /**
     * Adds an input to watch for.
     * 
     * @param id The unique numerical identifier for the input
     * @param codes Which keycodes to watch for
     */
    public add(id: InputID, codes: KeyCode[]) {
        const keyState = new KeyState();
        this.keyStates[id] = keyState;

        for (let i = 0; i < codes.length; ++i) {
            this.keyMap[codes[i]] = keyState;
        }
    }

    /**
     * Gets the current state of a given input
     * 
     * @param id The unique numerical identifier for the input
     */
    public get(id: InputID): KeyState {
        const keyState = this.keyStates[id];

        if (!keyState) {
            throw new Error("key ID " + id + " not found");
        }

        return keyState;
    }

    public step(): InputIDToStateMap {
        return this.keyStates;
    }

    public listenTo(doc: Document) {
        doc.onkeydown = (evt: KeyboardEvent) => {
            const keyState = this.keyMap[evt.code];

            if (keyState) {
                keyState.pressed = !keyState.held;
                keyState.held = true;
            }
        };

        doc.onkeyup = (evt: KeyboardEvent) => {
            const keyState = this.keyMap[evt.code];

            if (keyState) {
                keyState.held = false;
            }
        };
    }
}
