import { describe, expect, it } from 'vitest';

import reducer, { setHeroData } from './HeroSlice';

describe('HeroSlice', () => {
  it('sets hero data', () => {
    const payload = { title: 'Hero' };
    expect(reducer(null, setHeroData(payload))).toEqual(payload);
  });
});
