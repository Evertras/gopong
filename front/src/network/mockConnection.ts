import sinon from 'sinon';
import { gopongmsg } from '../../../messages/tsmessage/messages';
import { DataCallback, IConnection } from './connection';

/**
 * A mock connection, useful for easy testing.
 */
export class MockConnection implements IConnection {
    public onData: DataCallback | null = null;
    public write = sinon.spy();
    public currentLatencyMs = sinon.spy();

    /**
     * Mocks a write from the server to make a client think it received data.
     *
     * @param msg The state message to mock being written by the server.
     */
    public mockReceive(msg: gopongmsg.Server) {
        if (this.onData) {
            this.onData(msg);
        } else {
            throw new Error('onData not set');
        }
    }
}
