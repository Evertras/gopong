import { gopongmsg } from '../../../messages/tsmessage/messages';
import { DataCallback, IConnection } from './connection';

/**
 * A connection that can simulate configurable amounts of lag for
 * development/testing purposes.
 */
export class LaggingConnection implements IConnection {

    public onData: DataCallback | null = null;
    private endpoint: string;

    private ws: WebSocket | null = null;
    private isOpen: boolean = false;
    private latencyMs: number = 0;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    public write(data: gopongmsg.IClient) {
        setTimeout(() => {
            if (this.ws && this.isOpen) {
                this.ws.send(gopongmsg.Client.encode(data).finish());
            }
        }, this.latencyMs);
    }

    public setLatencyMs(latencyMs: number) {
        this.latencyMs = latencyMs;
    }

    public currentLatencyMs(): number {
        return this.latencyMs;
    }

    public start() {
        this.ws = new WebSocket(this.endpoint);
        this.ws.binaryType = 'arraybuffer';

        this.ws.onopen = () => {
            console.log('OPEN');
            this.isOpen = true;
        };

        this.ws.onclose = () => {
            console.log('CLOSE');
            this.ws = null;
        };

        this.ws.onmessage = (evt: MessageEvent) => {
            setTimeout(() => {
                if (this.onData) {
                    const array = new Uint8Array(evt.data);
                    const decoded = gopongmsg.Server.decode(array);

                    this.onData(decoded);
                }
            }, this.latencyMs);
        };

        this.ws.onerror = (evt) => {
            console.log('ERROR: ' + evt);
        };
    }
}
