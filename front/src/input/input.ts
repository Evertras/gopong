import { KeyCode } from './keyCodes';
import { KeyState } from './keyState';

/**
 * A unique numerical identifier for an input.  This should be defined
 * as a constant enum somewhere for the game, such as MoveUp = 1, etc.
 */
export type InputID = number;

export interface IInputIDToStateMap { [key: number]: KeyState; }
interface IKeyCodeToStateMap { [key: string]: KeyState; }

export class Input {
    // Maps key codes to key states
    private keyMap: IKeyCodeToStateMap = {};

    // Maps a unique InputID to a key state for that ID
    private keyStates: IInputIDToStateMap = {};

    /**
     * Adds an input to watch for.
     *
     * @param id The unique numerical identifier for the input
     * @param codes Which keycodes to watch for
     */
    public add(id: InputID, codes: KeyCode[]) {
        const keyState = new KeyState();
        this.keyStates[id] = keyState;

        for (const code of codes) {
            this.keyMap[code] = keyState;
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
            throw new Error('key ID ' + id + ' not found');
        }

        return keyState;
    }

    public step(): IInputIDToStateMap {
        // This is actually pretty quick... http://jsben.ch/gtKdJ
        const copied = JSON.parse(JSON.stringify(this.keyStates)) as IInputIDToStateMap;

        // We know this is fine, no prototypes to worry about
        // tslint:disable-next-line: forin
        for (const id in this.keyStates) {
            this.keyStates[id].pressed = false;
        }

        return copied;
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
