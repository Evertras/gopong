import { expect } from 'chai';
import 'mocha';
import { Input } from './input';

describe('input', () => {
    describe('valid/invalid keystates', () => {
        it('returns a valid key state that was added', () => {
            const input = new Input();

            input.add(0, [80]);

            const state = input.get(0);

            expect(state).to.not.be.null;
        });

        it('throws an error when trying to retrieve a key that was not added', () => {
            const input = new Input();

            expect(() => {
                input.add(1, [80]);
                input.get(1);
            }).not.to.throw();

            expect(() => {
                input.get(0);
            }).to.throw(/not found/);
        });
    })
});