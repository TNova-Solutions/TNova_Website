import { describe, expect, it } from 'vitest';

import reducer, { setWorkData } from './WorkSlice';

describe('WorkSlice', () => {
  it('sets work data', () => {
    const payload = { title: 'Work' };
    expect(reducer(null, setWorkData(payload))).toEqual(payload);
  });
});
