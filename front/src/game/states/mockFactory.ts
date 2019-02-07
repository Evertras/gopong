// tslint:disable:max-classes-per-file
import sinon from 'sinon';
import { IStateFactory } from './factory';
import { IState } from './state';

export class MockState implements IState {
    public applyInput = sinon.spy();
    public applyServerUpdate = sinon.spy();
    public draw = sinon.spy();
    public step = sinon.spy();
}

export class MockStateFactory implements IStateFactory {
    public mockState = new MockState();

    public create = sinon.stub();

    constructor() {
        this.create.returns(this.mockState);
    }
}
