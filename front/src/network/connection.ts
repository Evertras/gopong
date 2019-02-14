import { gopongmsg } from '../../../messages/tsmessage/messages';

export type DataCallback = (data: gopongmsg.Server) => void;

/**
 * Connection is an abstracted WebSocket connection to a server.
 * It can buffer write and read requests, handle reconnects, etc.
 */
export interface IConnection {

    /**
     * Callback for when data is received from the server.
     */
    onData: DataCallback | null;
    /**
     * Writes data to the connection.  The data is not guaranteed
     * to be written immediately, but may be buffered.
     *
     * @param data The data to write to the connection
     */
    write(data: string): void;

    /**
     * The current latency of the connection, in milliseconds.
     */
    currentLatencyMs(): number;
}
