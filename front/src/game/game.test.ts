// tslint:disable:no-unused-expression

import chai from 'chai';
import sinon from 'sinon';
import sinonChai = require('sinon-chai');
import { MockRenderTarget } from '../graphics/mockRenderTarget';
import { Input } from '../input/input';
import { IMessageClientConfig, IMessageState, ServerPaddleSide, ServerState } from '../network/messageTypes';
import { MockConnection } from '../network/mockConnection';
import { StoreConfig } from '../store/config';
import { StoreInput } from '../store/input';
import { Game } from './game';
import { MockState, MockStateFactory } from './states/mockFactory';

chai.use(sinonChai);

const expect = chai.expect;

describe('game', () => {
    let clock: sinon.SinonFakeTimers;

    // So we get one frame every millisecond tick
    const fps = 1000;
    const testTicks = 10;

    let mockStateFactory: MockStateFactory;
    let mockRenderTarget: MockRenderTarget;
    let mockConnection: MockConnection;
    let mockState: MockState;
    let input: Input;
    let storeInput: StoreInput;
    let storeConfig: StoreConfig;
    let game: Game;

    before(() => {
        clock = sinon.useFakeTimers();
    });

    after(() => {
        clock.restore();
    });

    beforeEach(() => {
        mockStateFactory = new MockStateFactory();
        mockRenderTarget = new MockRenderTarget();
        mockConnection = new MockConnection();
        mockState = mockStateFactory.mockState;
        input = new Input();
        storeInput = new StoreInput(input);
        storeConfig = new StoreConfig();
        game = new Game(mockStateFactory, mockRenderTarget, mockConnection, storeInput, storeConfig);
    });

    afterEach(() => {
        game.stop();
    });

    describe('draw', () => {
        it('calls begin() on its render context each loop', () => {
            game.start(fps);

            clock.tick(testTicks);

            expect(mockRenderTarget.begin).to.have.callCount(testTicks);
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

        it('applies config data when received', () => {
            // To test for clobbering...
            storeConfig.clientSidePredictionEnabled = true;
            storeConfig.serverReconciliationEnabled = false;

            const clientSidePrediction = true;
            const serverReconciliation = false;

            const fakeConfig: IMessageClientConfig = {
                gameConfig: {
                    ballRadius: 0.5,
                    paddleHeight: 0.4,
                    paddleWidth: 0.1,
                    paddleMaxSpeedPerSecond: 4,
                },
                playerSide: ServerPaddleSide.Right,
            };

            // Shouldn't create a state based off of this...
            mockStateFactory.create.throws('tried to incorrectly create state');

            mockConnection.mockReceive(fakeConfig);

            expect(storeConfig.ballRadius, 'ball radius not applied').to.equal(fakeConfig.gameConfig.ballRadius);
            expect(storeConfig.paddleHeight, 'paddle height not applied').to.equal(fakeConfig.gameConfig.paddleHeight);
            expect(storeConfig.paddleMaxSpeedPerSecond, 'paddle max speed not applied')
                .to.equal(fakeConfig.gameConfig.paddleMaxSpeedPerSecond);
            expect(storeConfig.side, 'side not set').to.equal(fakeConfig.playerSide);

            // Just to make sure we didn't clobber anything...
            expect(storeConfig.clientSidePredictionEnabled, 'clobbered').to.equal(clientSidePrediction);
            expect(storeConfig.serverReconciliationEnabled, 'clobbered').to.equal(serverReconciliation);
        });
    });

    describe('state', () => {
        describe('isolated', () => {
            it('does not create a state on its own', () => {
                game.start(fps);
                expect(mockStateFactory.create).to.have.not.been.called;
            });
        });

        describe('with state message from server', () => {
            const stateType = ServerState.Starting;

            beforeEach(() => {
                const stateMsg: IMessageState = {
                    n: 0,
                    s: {},
                    t: stateType,
                };

                mockConnection.mockReceive(stateMsg);
            });

            it('creates an appropriate state when receiving a message from the server to do so', () => {
                expect(mockStateFactory.create).to.have.been.calledWith(stateType);
            });

            it('calls step and draw for the state each frame', () => {
                game.start(1000);
                clock.tick(10);

                expect(mockState.step).to.have.callCount(testTicks);
                expect(mockState.draw).to.have.callCount(testTicks);
            });
        });
    });
});
