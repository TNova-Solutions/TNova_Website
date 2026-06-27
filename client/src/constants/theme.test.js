import { describe, expect, it } from 'vitest';

import { TOKENS } from './theme';

describe('theme tokens', () => {
  it('exposes the expected brand palette values', () => {
    expect(TOKENS).toEqual(
      expect.objectContaining({
        slate: '#13131F',
        emerald: '#5629F2',
        paper: '#F5F5FA',
      })
    );
  });
});
