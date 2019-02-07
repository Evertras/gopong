import sinon from 'sinon';
import { IConnection } from './connection';

export class MockConnection implements IConnection {
    public onData = null;
    public write = sinon.spy();
    public currentLatencyMs = sinon.spy();
}
