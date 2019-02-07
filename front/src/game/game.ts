import { IRenderTarget } from '../graphics/renderTarget';
import { Input } from '../input/input';
import { IConnection } from '../network/connection';
import { StoreConfig } from '../store/config';
import { StoreInput } from '../store/input';
import { IMessageInput, IMessageState } from './networkTypes';
import { StateStarting } from './states/starting/starting';
import { IState } from './states/state';

/**
 * Controls the game loop and passes information on to underlying states.
 */
export class Game {
    // Stores to share data
    private storeInput: StoreInput;
    private storeConfig: StoreConfig = new StoreConfig();

    private currentState: IState;

    private updateInterval: number | undefined;
    private lastUpdateMs: number = 0;
    private renderTarget: IRenderTarget;

    private connection: IConnection;

    constructor(renderTarget: IRenderTarget, connection: IConnection, input: Input) {
        this.storeInput = new StoreInput(input);

        this.renderTarget = renderTarget;

        this.currentState = new StateStarting(3000);

        this.connection = connection;
        this.connection.onData = (data: string) => {
            const parsed = JSON.parse(data);

            const stateMessage = parsed as IMessageState;

            if (stateMessage) {
                this.storeInput.deleteUntil(stateMessage.n);
                this.currentState.applyServerUpdate(stateMessage.s);

                if (this.storeConfig.serverReconciliationEnabled) {
                    const buffer = this.storeInput.getBuffer();
                    for (const i of buffer) {
                        this.currentState.applyInput(i);
                    }
                }
            }
        };
    }

    public start(fps: number) {
        clearInterval(this.updateInterval);
        this.lastUpdateMs = Date.now();

        const stepSizeMilliseconds = 1000.0 / fps;

        this.updateInterval = setInterval(() => {
            this.gameLoopStep();
        }, stepSizeMilliseconds);
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

        const inputMessage: IMessageInput = {
            m: input.movementAxis,
            n: input.index,
            d: input.durationSeconds,
        };

        this.connection.write(JSON.stringify(inputMessage));
    }

    private update(deltaMs: number) {
        this.currentState.step(deltaMs * 0.001);

        if (this.storeConfig.clientSidePredictionEnabled) {
            this.currentState.applyInput(this.storeInput.getLatest());
        }
    }

    private draw() {
        this.renderTarget.begin();

        this.currentState.draw(this.renderTarget);

        // Some info/debug text
        const left = 0.3;
        const top = 0.05;
        const step = 0.05;

        const text = [
            'Client Side Prediction (P): ' + (this.storeConfig.clientSidePredictionEnabled ? 'ON' : 'off'),
            'Server Reconciliation (R): ' + (this.storeConfig.serverReconciliationEnabled ? 'ON' : 'off'),
            'Unprocessed inputs: ' + this.storeInput.inputBufferLength(),
            'Latency: ' + this.connection.currentLatencyMs() + 'ms',
        ];

        for (let i = 0; i < text.length; ++i) {
            this.renderTarget.text(text[i], left, top + step * i);
        }
    }
}
