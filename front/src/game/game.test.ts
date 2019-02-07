// tslint:disable:no-unused-expression

import chai from 'chai';
import sinon from 'sinon';
import sinonChai = require('sinon-chai');
import { MockRenderTarget } from '../graphics/mockRenderTarget';
import { Input } from '../input/input';
import { MockConnection } from '../network/mockConnection';
import { Game } from './game';

chai.use(sinonChai);

const expect = chai.expect;

describe('game', () => {
    let clock: sinon.SinonFakeTimers;

    let mockRenderTarget: MockRenderTarget;
    let mockConnection: MockConnection;
    let input: Input;
    let game: Game;

    before(() => {
        clock = sinon.useFakeTimers();
    });

    after(() => {
        clock.restore();
    });

    beforeEach(() => {
        mockRenderTarget = new MockRenderTarget();
        mockConnection = new MockConnection();
        input = new Input();
        game = new Game(mockRenderTarget, mockConnection, input);
    });

    describe('draw', () => {
        it('calls begin() on its render context each loop', () => {
            game.start(1000);

            clock.tick(1000);

            expect(mockRenderTarget.begin).to.have.callCount(1000);
        });
    });

    describe('connection', () => {
        it('supplies the onData callback to the connection upon creation', () => {
            // Just a quick sanity check to make sure the test is valid...
            const otherMockConnection = new MockConnection();
            expect(otherMockConnection.onData).to.not.exist;

            // Our game should have supplied onData
            expect(mockConnection.onData).to.exist;
        });
    });

    describe('state', () => {
        // it('calls step for the state each frame', () => { });
    });
});
