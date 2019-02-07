import { Game } from './game/game';
import { StateFactory } from './game/states/factory';
import { SquareRenderTarget } from './graphics/squareRenderTarget';
import { Input } from './input/input';
import { LaggingConnection } from './network/laggingConnection';
import { StoreConfig } from './store/config';
import { StoreInput } from './store/input';

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

    // Dependencies
    const connection = new LaggingConnection('ws://localhost:8000/join');
    const storeConfig = new StoreConfig();
    const stateFactory = new StateFactory(storeConfig);
    const input = new Input();
    input.listenTo(window.document);
    const storeInput = new StoreInput(input);

    const game = new Game(
        stateFactory,
        target,
        connection,
        storeInput,
        storeConfig,
    );

    // Add some fake lag
    connection.setLatencyMs(500);
    connection.start();

    game.start(30);
});
