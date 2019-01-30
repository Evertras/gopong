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
        down: false
    }
    private inputBuffer: InputState[] = [];

    private updateInterval: number | undefined;
    private lastUpdateMilliseconds: number = 0;
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
            && this.inputBuffer[trim].index < serverState.n
        ) {
            ++trim;
        }

        this.inputBuffer.splice(0, trim);
    }

    public inputUp(pressed: boolean) {
        this.currentInputs.up = pressed;
    }

    public inputDown(pressed: boolean) {
        this.currentInputs.down = pressed;
    }

    public start(fps: number) {
        clearInterval(this.updateInterval);
        this.lastUpdateMilliseconds = Date.now();

        const stepSizeMilliseconds = 1000.0/fps;

        this.updateInterval = setInterval(() => {

            const now = Date.now();

            this.timeAccumulatedMilliseconds += now - this.lastUpdateMilliseconds;

            this.lastUpdateMilliseconds = now;

            while (this.timeAccumulatedMilliseconds > 0) {
                this.timeAccumulatedMilliseconds -= stepSizeMilliseconds;
            }

            const input = this.getCurrentInput();

            this.draw();

            const inputMessage: InputMessage = {
                m: input.movementAxis,
                n: input.index
            };

            this.inputBuffer.push(input);

            this.connection.write(JSON.stringify(inputMessage));

        }, stepSizeMilliseconds);
    }

    private getCurrentInput(): InputState {
        let axis = 0;

        if (this.currentInputs.up) {
            axis -= 1;
        }

        if (this.currentInputs.down) {
            axis += 1;
        }

        return {
            movementAxis: axis,
            index: this.inputIndex++
        };
    }

    private draw() {
        this.renderTarget.begin();
        this.paddleLeft.draw(this.renderTarget);
        this.paddleRight.draw(this.renderTarget);
        this.ball.draw(this.renderTarget);

        this.renderTarget.text("Unprocessed inputs: " + this.inputBuffer.length, 0.5, 0.1);
    }
}
