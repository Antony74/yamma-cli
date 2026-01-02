import { describe, expect, it } from 'vitest';
import { cli } from '../src/cli';

describe('cli', () => {
    it('exists', () => {
        expect(cli).toBeTruthy();
    });
});
