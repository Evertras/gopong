import { SquareRenderTarget } from './graphics/renderTarget';
import { LagConnection } from './network/connection';
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

    const connection = new LagConnection("ws://localhost:8000/join");

    const game = new Game(target, connection);

    connection.start();
    game.start(30);

    const keyHandler = (evt: KeyboardEvent) => {
        // Up/W
        if (evt.keyCode == 38 || evt.keyCode == 87) {
            game.inputUp(evt.type == "keydown");
        }

        // Down/S
        if (evt.keyCode == 40 || evt.keyCode == 83) {
            game.inputDown(evt.type == "keydown");
        }
    };

    document.body.onkeydown = keyHandler;
    document.body.onkeyup = keyHandler;
});
