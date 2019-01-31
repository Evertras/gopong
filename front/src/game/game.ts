import { Paddle, PaddleSide } from "./paddle";
import { Ball } from "./ball";
import { StateMessage, InputMessage } from "./networkTypes";
import { InputState } from "./input";
import { SquareRenderTarget } from "../graphics/renderTarget";
import { Connection } from "../network/connection";

export class Game {
    public paddleLeft: Paddle;
    public paddleRight: Paddle;
    public ball: Ball;

    private inputIndex: number = 0;
    private currentInputs = {
        up: false,
        down: false,
        clientSidePredictionEnabled: false,
        serverReconciliationEnabled: false,
    };
    private inputBuffer: InputState[] = [];

    private updateInterval: number | undefined;
    private lastUpdateMs: number = 0;
    private timeAccumulatedMilliseconds: number = 0;

    private renderTarget: SquareRenderTarget;

    private connection: Connection;

    constructor(renderTarget: SquareRenderTarget, connection: Connection) {
        // Temporary
        const paddleHeight = 0.1;
        const paddleMaxSpeedPerSecond = 0.1;
        const ballRadius = 0.02;

        this.paddleLeft = new Paddle(paddleHeight, paddleMaxSpeedPerSecond, PaddleSide.Left, true);
        this.paddleRight = new Paddle(paddleHeight, paddleMaxSpeedPerSecond, PaddleSide.Right, false);
        this.ball = new Ball(ballRadius);

        this.renderTarget = renderTarget;

        this.connection = connection;
        this.connection.onData = (data: string) => {
            const parsed = JSON.parse(data);

            const stateMessage = parsed as StateMessage;

            if (stateMessage) {
                this.applyServerUpdate(stateMessage);
            }
        }
    }

    public applyServerUpdate(serverState: StateMessage) {
        this.paddleLeft.applyServerUpdate(serverState.s.pL);
        this.paddleRight.applyServerUpdate(serverState.s.pR);
        this.ball.applyServerUpdate(serverState.s.b);

        let trim = 0;
        while(
            trim < this.inputBuffer.length
            && this.inputBuffer[trim].index <= serverState.n
        ) {
            ++trim;
        }

        this.inputBuffer.splice(0, trim);

        if(this.currentInputs.serverReconciliationEnabled) {
            for (let i = 0; i < this.inputBuffer.length; ++i) {
                this.paddleLeft.applyMovementInput(
                    this.inputBuffer[i].movementAxis,
                    this.inputBuffer[i].durationSeconds);
            }
        }
    }

    public inputUp(pressed: boolean) {
        this.currentInputs.up = pressed;
    }

    public inputDown(pressed: boolean) {
        this.currentInputs.down = pressed;
    }

    public inputToggleClientSidePrediction() {
        this.currentInputs.clientSidePredictionEnabled = !this.currentInputs.clientSidePredictionEnabled;
    }

    public inputToggleServerReconciliation() {
        this.currentInputs.serverReconciliationEnabled = !this.currentInputs.serverReconciliationEnabled;

        this.currentInputs.clientSidePredictionEnabled =
               this.currentInputs.clientSidePredictionEnabled
            || this.currentInputs.serverReconciliationEnabled;
    }

    public start(fps: number) {
        clearInterval(this.updateInterval);
        this.lastUpdateMs = Date.now();

        const stepSizeMilliseconds = 1000.0/fps;

        this.updateInterval = setInterval(() => {

            const nowMs = Date.now();
            const frameElapsedMs = nowMs - this.lastUpdateMs;

            this.timeAccumulatedMilliseconds += frameElapsedMs;

            this.lastUpdateMs = nowMs;

            while (this.timeAccumulatedMilliseconds > 0) {
                this.timeAccumulatedMilliseconds -= stepSizeMilliseconds;
            }

            const input = this.getCurrentInput(frameElapsedMs * 0.001);

            this.draw();

            const inputMessage: InputMessage = {
                m: input.movementAxis,
                n: input.index,
                d: input.durationSeconds
            };

            this.inputBuffer.push(input);

            if (this.currentInputs.clientSidePredictionEnabled) {
                this.paddleLeft.applyMovementInput(input.movementAxis, input.durationSeconds);
            }

            this.connection.write(JSON.stringify(inputMessage));

        }, stepSizeMilliseconds);
    }

    private getCurrentInput(durationSeconds: number): InputState {
        let axis = 0;

        if (this.currentInputs.up) {
            axis -= 1;
        }

        if (this.currentInputs.down) {
            axis += 1;
        }

        return {
            movementAxis: axis,
            index: this.inputIndex++,
            durationSeconds: durationSeconds
        };
    }

    private draw() {
        this.renderTarget.begin();
        this.paddleLeft.draw(this.renderTarget);
        this.paddleRight.draw(this.renderTarget);
        this.ball.draw(this.renderTarget);

        // Some info/debug text
        const left = 0.3;
        const top = 0.05;
        const step = 0.05;

        const text = [
            "Client Side Prediction (P): " + (this.currentInputs.clientSidePredictionEnabled ? "ON" : "off"),
            "Server Reconciliation (R): " + (this.currentInputs.serverReconciliationEnabled ? "ON" : "off"),
            "Unprocessed inputs: " + this.inputBuffer.length,
            "Latency: " + this.connection.currentLatencyMs() + "ms"
        ];

        for (let i = 0; i < text.length; ++i) {
            this.renderTarget.text(text[i], left, top + step*i);
        }
    }
}
