/* tslint:disable:no-unused-expression */

import { expect } from 'chai';
import 'mocha';
import { Input } from './input';
import { KeyCode } from './keyCodes';

const mockDown = (code: KeyCode) => {
    const evtDown = new KeyboardEvent('keydown', {
        code,
    });

    if (window.document.onkeydown) {
        window.document.onkeydown(evtDown);
    }
};

const mockUp = (code: KeyCode) => {
    const evtUp = new KeyboardEvent('keyup', {
        code,
    });

    if (window.document.onkeyup) {
        window.document.onkeyup(evtUp);
    }
};

describe('input', () => {
    describe('valid/invalid keystates', () => {
        it('returns a valid key state that was added', () => {
            const input = new Input();

            input.add(0, [KeyCode.W]);

            const state = input.get(0);

            expect(state).to.not.be.null;
        });

        it('throws an error when trying to retrieve a key that was not added', () => {
            const input = new Input();

            expect(() => {
                input.add(1, [KeyCode.W]);
                input.get(1);
            }).not.to.throw();

            expect(() => {
                input.get(0);
            }).to.throw(/not found/);
        });
    });

    describe('listens to document', () => {
        it('registers keydown and keyup', () => {
            const i = new Input();

            i.listenTo(window.document);

            expect(window.document.onkeydown, 'onkeydown missing').to.exist;
            expect(window.document.onkeyup, 'onkeyup missing').to.exist;
        });
    });

    describe('keys', () => {
        const keyCode = KeyCode.W;
        const id = 17;
        let input = new Input();

        beforeEach(() => {
            input = new Input();
            input.add(id, [keyCode]);
            input.listenTo(window.document);
        });

        it('detects a key being held and released', () => {
            const state = input.get(id);

            expect(state.held, 'key incorrectly held').to.be.false;

            mockDown(keyCode);

            expect(state.held, 'key not held').to.be.true;

            mockUp(keyCode);

            expect(state.held, 'key incorrectly still held').to.be.false;
        });

        it('detects a key being pressed', () => {
            const state = input.get(id);

            expect(state.pressed, 'key incorrectly pressed').to.be.false;

            mockDown(keyCode);

            expect(state.pressed, 'key not pressed').to.be.true;
        });

        it('only detects a key press for one step', () => {
            const state = input.get(id);

            mockDown(keyCode);
            expect(state.pressed, 'key not pressed').to.be.true;
            input.step();
            expect(state.pressed, 'key incorrectly still pressed').to.be.false;
        });
    });
});
