import { describe, expect, it } from 'vitest';

import reducer, { setCtaBandData } from './CtaBandSlice';

describe('CtaBandSlice', () => {
  it('sets cta band data', () => {
    const payload = { title: 'CTA' };
    expect(reducer(null, setCtaBandData(payload))).toEqual(payload);
  });
});
