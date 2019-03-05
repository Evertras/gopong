import sinon from 'sinon';
import { IRenderTarget } from './renderTarget';

export class MockRenderTarget implements IRenderTarget {
    public resize = sinon.spy();
    public beginFrame = sinon.spy();
    public beginScene = sinon.spy();
    public circle = sinon.spy();
    public rect = sinon.spy();
    public text = sinon.spy();
}
