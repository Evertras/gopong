import { Connection, DataCallback } from "./connection";

/**
 * A connection that can simulate configurable amounts of lag for
 * development/testing purposes.
 */
export class LaggingConnection implements Connection {
    private endpoint: string;

    private ws: WebSocket | null = null;
    private isOpen: boolean = false;

    public onData: DataCallback | null = null;

    write(data: string) {
        if (this.ws && this.isOpen) {
            this.ws.send(data);
        }
    }

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    public start() {
        this.ws = new WebSocket(this.endpoint);

        this.ws.onopen = () => {
            console.log("OPEN");
            this.isOpen = true;
        }

        this.ws.onclose = () => {
            console.log("CLOSE");
            this.ws = null;
        }

        this.ws.onmessage = (evt: any) => {
            if (this.onData) {
                this.onData(evt.data);
            }
        }

        this.ws.onerror = function(evt) {
            console.log("ERROR: " + evt);
        }
    }
}
