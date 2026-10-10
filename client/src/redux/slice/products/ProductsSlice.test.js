import { describe, expect, it } from 'vitest';

import reducer, { setProductsData } from './ProductsSlice';

describe('ProductsSlice', () => {
  it('sets hero data', () => {
    const payload = { title: 'Hero' };
    expect(reducer(null, setProductsData(payload))).toEqual(payload);
  });
});
