export type DataCallback = (data: string) => void;

/**
 * Connection is an abstracted WebSocket connection to a server.
 * It can buffer write and read requests, handle reconnects, etc.
 */
export interface IConnection {

    /**
     * Callback for when data is received, passed back as a simple string.
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
