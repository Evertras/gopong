import { KeyState } from "./keyState";

export type KeyID = number;
export type KeyCode = number;

export class Input {
    private keyMap: { [key:number]:KeyState; } = {};
    private keyStates: { [key:number]:KeyState; } = {};

    public add(id: KeyID, codes: KeyCode[]) {
        const keyState = new KeyState();
        this.keyStates[id] = keyState;

        for (let i = 0; i < codes.length; ++i) {
            this.keyMap[codes[i]] = keyState;
        }
    }

    public get(id: KeyID): KeyState {
        const keyState = this.keyStates[id];

        if (!keyState) {
            throw new Error("key ID " + id + " not found");
        }

        return keyState;
    }
}
