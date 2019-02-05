import { IRenderTarget } from '../graphics/renderTarget';
import { Input } from '../input/input';
import { IConnection } from '../network/connection';
import { StoreConfig } from '../store/config';
import { StoreInput } from '../store/input';
import { IMessageInput, IMessageState } from './networkTypes';
import { StatePlay } from './states/play/play';
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
    private timeAccumulatedMilliseconds: number = 0;

    private renderTarget: IRenderTarget;

    private connection: IConnection;

    constructor(renderTarget: IRenderTarget, connection: IConnection, input: Input) {
        this.storeInput = new StoreInput(input);

        this.renderTarget = renderTarget;

        this.currentState = new StatePlay(this.storeConfig);

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

            const nowMs = Date.now();
            const frameElapsedMs = nowMs - this.lastUpdateMs;

            this.timeAccumulatedMilliseconds += frameElapsedMs;

            this.lastUpdateMs = nowMs;

            while (this.timeAccumulatedMilliseconds > 0) {
                this.timeAccumulatedMilliseconds -= stepSizeMilliseconds;
            }

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

            this.draw();

            const inputMessage: IMessageInput = {
                m: input.movementAxis,
                n: input.index,
                d: input.durationSeconds,
            };

            if (this.storeConfig.clientSidePredictionEnabled) {
                this.currentState.applyInput(input);
            }

            this.connection.write(JSON.stringify(inputMessage));

        }, stepSizeMilliseconds);
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
