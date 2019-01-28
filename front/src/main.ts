import { SquareRenderTarget } from './graphics/renderTarget';
import { Connection } from './network/connection';
import { StateMessage, GameConfigMessage } from './network/types';

function getContext(): CanvasRenderingContext2D {
    const canvas = document.getElementById("playArea") as HTMLCanvasElement;

    if (canvas === undefined) {
        throw new Error("Could not find canvas");
    }

    const ctxOrNull = canvas.getContext("2d");

    if (ctxOrNull === null || ctxOrNull === undefined) {
        throw new Error("Could not find 2d context on canvas");
    }

    return ctxOrNull as CanvasRenderingContext2D;
}

window.addEventListener("load", function() {
    const target: SquareRenderTarget = new SquareRenderTarget(getContext());

    target.updateSize(window.innerWidth, window.innerHeight);

    window.addEventListener("resize", function() {
        target.updateSize(window.innerWidth, window.innerHeight);
    })

    const paddleHeight = 0.1;
    const ballRadius = 0.02;

    function drawPaddle(player: number, pos: number, heightPercent: number) {
        // Dealing with [0,1] coordinates
        const width = 0.03;
        const height = heightPercent;
        const x = player === 1 ? 0 : 1-width;
        const y = pos - height*0.5;

        target.rect(x, y, width, height);
    }

    function drawBall(x: number, y: number, r: number) {
        target.circle(x, y, r);
    }

    function drawState(s: StateMessage) {
        target.begin();
        drawPaddle(1, s.pL.c, paddleHeight);
        drawPaddle(2, s.pR.c, paddleHeight);
        drawBall(s.b.pX, s.b.pY, ballRadius);
    }

    const onState = (s: StateMessage) => {
        drawState(s);
    };

    const onGameConfig = (c: GameConfigMessage) => {
        console.log("Got config!", c);
    };

    const connection = new Connection("ws://localhost:8000/join", onState, onGameConfig);

    connection.start();
});
