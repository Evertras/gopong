import { gopongmsg } from '../../../messages/tsmessage/messages';
import { IRenderTarget } from '../graphics/renderTarget';
import { IConnection } from '../network/connection';
import { StoreConfig } from '../store/config';
import { StoreInput } from '../store/input';
import { IStateFactory } from './states/factory';
import { IState } from './states/state';

/**
 * Controls the game loop and passes information on to underlying states.
 */
export class Game {
    private running: boolean = false;

    // Stores to share data
    private storeInput: StoreInput;
    private storeConfig: StoreConfig;

    // Handles creation of states for transitions dictated by server
    private stateFactory: IStateFactory;

    // Current state that we can blindly send server updates and input to
    private currentState: IState | null = null;
    private currentStateType: gopongmsg.Server.State.Type | null = null;

    // Timing data for frames
    private lastUpdateMs: number = 0;

    // What we draw to
    private renderTarget: IRenderTarget;

    // Connection to the server
    private connection: IConnection;

    constructor(
        stateFactory: IStateFactory,
        renderTarget: IRenderTarget,
        connection: IConnection,
        storeInput: StoreInput,
        storeConfig: StoreConfig,
    ) {
        this.storeInput = storeInput;
        this.storeConfig = storeConfig;
        this.renderTarget = renderTarget;
        this.stateFactory = stateFactory;
        this.connection = connection;

        this.connection.onData = (msg: gopongmsg.IServer) => {
            // Is this a config message?
            if (msg.config) {
                this.storeConfig.updateFromMessage(msg.config);

                return;
            }

            if (!msg.state) {
                throw new Error('Did not have config or state on message, something went wrong with encoding');
            }

            this.storeInput.deleteUntil(msg.state.lastInputIndex || 0);

            // Do we need to change to a new state?
            if (msg.state.type && this.currentStateType !== msg.state.type) {
                this.currentStateType = msg.state.type;
                this.currentState = this.stateFactory.create(msg.state.type);
            }

            // If we don't have any state, nothing more to do
            if (!this.currentState) {
                return;
            }

            this.currentState.applyServerUpdate(msg.state);

            // If we don't want server reconciliation, nothing more to do
            if (!this.storeConfig.serverReconciliationEnabled) {
                return;
            }

            // Apply server reconciliation
            const buffer = this.storeInput.getBuffer();
            for (const i of buffer) {
                this.currentState.applyInput(i);
            }
        };
    }

    public start() {
        this.lastUpdateMs = Date.now();
        this.running = true;

        const step = () => {
            if (this.running) {
                this.gameLoopStep();
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }

    public stop() {
        this.running = false;
    }

    private gameLoopStep() {
        // Figure out how long this iteration actually is, since setInterval is only best effort
        const nowMs = Date.now();
        const frameElapsedMs = nowMs - this.lastUpdateMs;
        this.lastUpdateMs = nowMs;

        // Basic game loop at a high level
        this.processInput();
        this.update(frameElapsedMs);
        this.draw();
    }

    private processInput() {
        this.storeInput.step();

        const input = this.storeInput.getLatest();

        if (input.toggleClientPredictionPressed) {
            this.storeConfig.clientSidePredictionEnabled = !this.storeConfig.clientSidePredictionEnabled;

            if (!this.storeConfig.clientSidePredictionEnabled) {
                this.storeConfig.serverReconciliationEnabled = false;
            }
        }

        if (input.toggleServerReconciliationPressed) {
            this.storeConfig.serverReconciliationEnabled = !this.storeConfig.serverReconciliationEnabled;

            if (this.storeConfig.serverReconciliationEnabled) {
                this.storeConfig.clientSidePredictionEnabled = true;
            }
        }

        const inputMessage = {
            input: {
                durationSeconds: input.durationSeconds,
                inputIndex: input.index,
                movementAxis: input.movementAxis,
            },
        };

        this.connection.write(inputMessage);
    }

    private update(deltaMs: number) {
        if (!this.currentState) {
            return;
        }

        this.currentState.step(deltaMs * 0.001);

        if (this.storeConfig.clientSidePredictionEnabled) {
            this.currentState.applyInput(this.storeInput.getLatest());
        }
    }

    private draw() {
        this.renderTarget.begin();

        if (this.currentState) {
            this.currentState.draw(this.renderTarget);
        }

        // Some info/debug text regardless of whether we have a state or not yet
        const left = 0.3;
        const top = 0.05;
        const step = 0.05;

        const text = [
            'Client Side Prediction (P): ' + (this.storeConfig.clientSidePredictionEnabled ? 'ON' : 'off'),
            'Server Reconciliation (R): ' + (this.storeConfig.serverReconciliationEnabled ? 'ON' : 'off'),
            'Unprocessed inputs: ' + this.storeInput.inputBufferLength(),
            'Latency: ' + this.connection.currentLatencyMs() + 'ms',
            'State: ' + this.currentStateType,
        ];

        for (let i = 0; i < text.length; ++i) {
            this.renderTarget.text(text[i], left, top + step * i);
        }
    }
}
