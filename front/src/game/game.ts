import { gopongmsg } from '../../../messages/tsmessage/messages';
import { IRenderTarget } from '../graphics/renderTarget';
import { IConnection } from '../network/connection';
import { StoreConfig } from '../store/config';
import { StoreInput } from '../store/input';
import { UIText } from './objects/uiText';
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
    private currentStateType: gopongmsg.State.Type | null = null;

    // Timing data for frames
    private lastUpdateMs: number = 0;

    // What we draw to
    private renderTarget: IRenderTarget;

    // Some debug text to display
    private debugTextClientSidePrediction: UIText = new UIText();
    private debugTextServerReconciliation: UIText = new UIText();
    private debugTextUnprocessedInputs: UIText = new UIText();
    private debugTextLatency: UIText = new UIText();
    private debugTextState: UIText = new UIText();

    private debugText: UIText[] = [
        this.debugTextClientSidePrediction,
        this.debugTextServerReconciliation,
        this.debugTextUnprocessedInputs,
        this.debugTextLatency,
        this.debugTextState,
    ];

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

        {
            const step = 0.05;

            this.debugText.forEach((element, i) => {
                element.x = 0.3;
                element.y = 0.1 + step * i;
            });
        }

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
                this.renderTarget.beginScene();
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
        this.renderTarget.beginFrame();

        if (this.currentState) {
            this.currentState.draw(this.renderTarget);
        }

        // Some info/debug text regardless of whether we have a state or not yet
        this.debugTextClientSidePrediction.text =
            'Client Side Prediction (P): ' + (this.storeConfig.clientSidePredictionEnabled ? 'ON' : 'off');
        this.debugTextServerReconciliation.text =
            'Server Reconciliation (R): ' + (this.storeConfig.serverReconciliationEnabled ? 'ON' : 'off');

        this.debugTextUnprocessedInputs.text =
            'Unprocessed inputs: ' + this.storeInput.inputBufferLength();

        this.debugTextLatency.text =
            'Latency: ' + this.connection.currentLatencyMs() + 'ms';

        this.debugTextState.text =
            'State: ' + this.currentStateType;

        this.debugText.forEach((element) => {
            element.draw(this.renderTarget);
        });
    }
}
