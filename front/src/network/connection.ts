import { Paddle } from "./types";

export class Connection {
    constructor(endpoint: string) {
        let ws = new WebSocket(endpoint);

        // For now, just send some random messages for the server to read
        let i = setInterval(() => {
            let time = new Date();
            ws.send(time.toISOString());
        }, 5000);

        ws.onopen = function(evt) {
            console.log("OPEN");
        }

        ws.onclose = function(evt) {
            console.log("CLOSE");
            clearInterval(i);
        }

        ws.onmessage = function(evt) {
            let parsed = JSON.parse(evt.data);
        }

        ws.onerror = function(evt) {
            console.log("ERROR: " + evt);
        }
    }
}
