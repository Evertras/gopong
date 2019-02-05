import { SquareRenderTarget } from './graphics/renderTarget';
import { LaggingConnection } from './network/laggingConnection';
import { Game } from './game/game';

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

    const connection = new LaggingConnection("ws://localhost:8000/join");

    const game = new Game(target, connection);

    connection.setLatencyMs(500);
    connection.start();
    game.start(30);
});
