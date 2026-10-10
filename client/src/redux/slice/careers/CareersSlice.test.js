import { describe, expect, it } from 'vitest';

import reducer, { setCareersData } from './CareersSlice';

describe('CareersSlice', () => {
  it('sets hero data', () => {
    const payload = { title: 'Hero' };
    expect(reducer(null, setCareersData(payload))).toEqual(payload);
  });
});
