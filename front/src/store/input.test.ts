/* tslint:disable:no-unused-expression */
import { expect } from 'chai';
import 'mocha';
import { Input } from '../input/input';
import { InputStore, Keys } from './input';

describe('input store', () => {
    it('should watch every key for input', () => {
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
