import { describe, expect, it } from 'vitest';

import reducer, { setFooterData } from './FooterSlice';

describe('FooterSlice', () => {
  it('sets footer data', () => {
    const payload = { brandName: 'TNova' };
    expect(reducer(null, setFooterData(payload))).toEqual(payload);
  });
});
