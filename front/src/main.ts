import { SquareRenderTarget } from './graphics/renderTarget';
import { Connection } from './network/connection';

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

    /*
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

    function drawState(s) {
        target.begin();
        drawPaddle(1, s.pL.c, s.pL.h);
        drawPaddle(2, s.pR.c, s.pR.h);
        drawBall(s.b.pX, s.b.pY, s.b.r);
    }
    */

    const connection = new Connection("ws://localhost:8000/join");
});
