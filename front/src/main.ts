import { SquareRenderTarget } from './graphics/renderTarget';
import { Connection } from './network/connection';
import { StateMessage, GameConfigMessage } from './network/types';
import { GameState } from './game/state';

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
    const paddleMaxSpeedPerSecond = 0.1;

    const game = new GameState(paddleHeight, paddleMaxSpeedPerSecond, ballRadius);

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

    function drawState(s: GameState) {
        target.begin();
        drawPaddle(1, s.paddleLeft.center, s.paddleLeft.height);
        drawPaddle(2, s.paddleRight.center, s.paddleRight.height);
        drawBall(s.ball.x, s.ball.y, s.ball.radius);
    }

    const onState = (s: StateMessage) => {
        game.applyServerUpdate(s);

        drawState(game);
    };

    const onGameConfig = (c: GameConfigMessage) => {
        console.log("Got config!", c);
    };

    const connection = new Connection("ws://localhost:8000/join", onState, onGameConfig);

    connection.start();
});
