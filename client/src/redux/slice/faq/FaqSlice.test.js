import { describe, expect, it } from 'vitest';

import reducer, { setFaqData } from './FaqSlice';

describe('FaqSlice', () => {
  it('sets hero data', () => {
    const payload = { title: 'Hero' };
    expect(reducer(null, setFaqData(payload))).toEqual(payload);
  });
});
