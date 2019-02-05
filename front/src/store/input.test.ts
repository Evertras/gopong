/* tslint:disable:no-unused-expression */
import { expect } from 'chai';
import 'mocha';
import 'sinon';
import { SinonFakeTimers, useFakeTimers } from 'sinon';
import { Input } from '../input/input';
import { InputStore, Keys } from './input';

describe('input store', () => {
    let clock: SinonFakeTimers;

    before(() => {
        clock = useFakeTimers();
    });

    after(() => {
        clock.restore();
    });

    describe('initialization', () => {
        it('watches all defined keys for input', () => {
            const input = new Input();

            // Should assign the appropriate keys
            new InputStore(input);

            const watched = input.step();

            let anyRun: boolean = false;

            // tslint:disable-next-line: forin
            for (const id in Keys) {
                if (isNaN(Number(id))) {
                    expect(watched[Number(Keys[id])], 'key not added: ' + id).to.exist;
                    anyRun = true;
                }
            }

            expect(anyRun, 'no keys checked').to.be.true;
        });
    });

    describe('step', () => {
        it('adds an input to the buffer for each call', () => {
            const input = new Input();
            const store = new InputStore(input);

            expect(store.inputBufferLength()).to.equal(0);

            store.step();

            expect(store.inputBufferLength()).to.equal(1);

            store.step();

            expect(store.inputBufferLength()).to.equal(2);
        });

        it('sets the duration for each input corectly', () => {
            clock.reset();

            const input = new Input();
            const store = new InputStore(input);
            const secondMs = 1000;
            const ticks = 10;

            for (let i = 0; i < ticks; ++i) {
                clock.tick(secondMs);
                store.step();
            }

            const buffer = store.getBuffer();

            for (let i = 0; i < ticks; ++i) {
                expect(buffer[i].durationSeconds).to.be.approximately(1, 0.001);
            }
        });

        it('increments the index each time', () => {
            const input = new Input();
            const store = new InputStore(input);
            const ticks = 10;

            for (let i = 0; i < ticks; ++i) {
                store.step();
            }

            const buffer = store.getBuffer();

            let lastIndex = buffer[0].index;

            for (let i = 1; i < ticks; ++i) {
                expect(buffer[i].index).to.equal(lastIndex + 1);

                lastIndex = buffer[i].index;
            }
        });
    });

    describe('deleteUntil', () => {
        it('does not delete anything if a low index is provided', () => {
            const input = new Input();
            const store = new InputStore(input);
            const ticks = 10;

            for (let i = 0; i < ticks; ++i) {
                store.step();
            }

            expect(store.inputBufferLength(), 'did not fill buffer').to.equal(ticks);

            store.deleteUntil(-1);

            expect(store.inputBufferLength(), 'deleted something incorrectly').to.equal(ticks);
        });

        it('deletes everything up to and including the given index', () => {
            const input = new Input();
            const store = new InputStore(input);
            const ticks = 10;

            for (let i = 0; i < ticks; ++i) {
                store.step();
            }

            expect(store.inputBufferLength(), 'did not fill buffer').to.equal(ticks);

            const buffer = store.getBuffer();

            const deleteToIndex = buffer[1].index;

            store.deleteUntil(deleteToIndex);

            expect(store.inputBufferLength(), 'did not delete expected number of items').to.equal(ticks - 2);
        });
    });

    describe('getLatest', () => {
        it('returns the latest correctly', () => {
            const input = new Input();
            const store = new InputStore(input);
            const ticks = 10;

            for (let i = 0; i < ticks; ++i) {
                store.step();
            }

            const buffer = store.getBuffer();

            expect(buffer[buffer.length - 1]).to.deep.equal(store.getLatest());
        });
    });
});
