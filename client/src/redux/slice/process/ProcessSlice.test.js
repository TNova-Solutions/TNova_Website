import { describe, expect, it } from 'vitest';

import reducer, { setProcessData } from './ProcessSlice';

describe('ProcessSlice', () => {
  it('sets process data', () => {
    const payload = { title: 'Process' };
    expect(reducer(null, setProcessData(payload))).toEqual(payload);
  });
});
