/* tslint:disable:no-unused-expression */

import { expect } from 'chai';
import 'mocha';
import { Input } from './input';
import { KeyCode } from './keyCodes';

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

            expect(window.document.onkeydown).to.not.be.undefined;
            expect(window.document.onkeyup).to.not.be.undefined;
        });

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

            const evtDown = new KeyboardEvent('keydown', {
                code: keyCode,
            });

            if (window.document.onkeydown) {
                window.document.onkeydown(evtDown);
            }

            expect(state.held, 'key not held').to.be.true;

            const evtUp = new KeyboardEvent('keyup', {
                code: keyCode,
            });

            if (window.document.onkeyup) {
                window.document.onkeyup(evtUp);
            }

            expect(state.held, 'key incorrectly still held').to.be.false;
        });
    });
});
