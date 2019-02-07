import sinon from 'sinon';
import { IRenderTarget } from './renderTarget';

export class MockRenderTarget implements IRenderTarget {
    public begin = sinon.spy();
    public circle = sinon.spy();
    public rect = sinon.spy();
    public text = sinon.spy();
}
