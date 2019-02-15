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
    // Go WASM playground
    /*
    const go = new Go();
    fetch('/lib.wasm')
        .then((resp) => resp.arrayBuffer())
        .then((data) => WebAssembly.instantiate(data, go.importObject))
        .then((instance) => go.run(instance));
    */
    // /Go WASM Playground

    const target: SquareRenderTarget = new SquareRenderTarget(getContext());

    target.updateSize(window.innerWidth, window.innerHeight);

    window.addEventListener('resize', () => {
        target.updateSize(window.innerWidth, window.innerHeight);
    });

    // Dependencies
    const connection = new LaggingConnection('ws://' + location.host + '/join');
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
    connection.setLatencyMs(50);
    connection.start();

    game.start();
});
