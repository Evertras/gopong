import { Game } from './game/game';
import { SquareRenderTarget } from './graphics/squareRenderTarget';
import { Input } from './input/input';
import { LaggingConnection } from './network/laggingConnection';

function getContext(): CanvasRenderingContext2D {
    const canvas = document.getElementById('playArea') as HTMLCanvasElement;

    if (canvas === undefined) {
        throw new Error('Could not find canvas');
    }

    const ctxOrNull = canvas.getContext('2d');

    if (ctxOrNull === null || ctxOrNull === undefined) {
        throw new Error('Could not find 2d context on canvas');
    }

    return ctxOrNull as CanvasRenderingContext2D;
}

window.addEventListener('load', () => {
    const target: SquareRenderTarget = new SquareRenderTarget(getContext());

    target.updateSize(window.innerWidth, window.innerHeight);

    window.addEventListener('resize', () => {
        target.updateSize(window.innerWidth, window.innerHeight);
    });

    const connection = new LaggingConnection('ws://localhost:8000/join');

    const input = new Input();

    input.listenTo(window.document);

    const game = new Game(target, connection, input);

    connection.setLatencyMs(500);
    connection.start();
    game.start(30);
});
