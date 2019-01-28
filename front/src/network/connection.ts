import { StateMessage, GameConfigMessage } from "./types";

export type StateCallback = (s: StateMessage) => void;
export type GameConfigCallback = (s: GameConfigMessage) => void;

export class Connection {
    private endpoint: string;
    private stateCallback: StateCallback;
    private gameConfigCallback: GameConfigCallback;

    constructor(endpoint: string, stateCallback: StateCallback, gameConfigCallback: GameConfigCallback) {
        this.endpoint = endpoint;
        this.stateCallback = stateCallback;
        this.gameConfigCallback = gameConfigCallback;
    }

    start() {
        const ws = new WebSocket(this.endpoint);

        // For now, just send some random messages for the server to read
        const i = setInterval(() => {
            let time = new Date();
            ws.send(time.toISOString());
        }, 5000);

        ws.onopen = function() {
            console.log("OPEN");
        }

        ws.onclose = function() {
            console.log("CLOSE");
            clearInterval(i);
        }

        ws.onmessage = (evt: any) => {
            const parsed = JSON.parse(evt.data);

            const state = parsed as StateMessage;

            if (state) {
                // We have a state message
                this.stateCallback(state);
                return;
            }

            const gameConfig = parsed as GameConfigMessage;

            if (gameConfig) {
                // We have game config
                this.gameConfigCallback(gameConfig);
                return;
            }

            console.warn("Unknown message received:", evt.data);
        }

        ws.onerror = function(evt) {
            console.log("ERROR: " + evt);
        }
    }
}
