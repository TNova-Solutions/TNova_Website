import { describe, expect, it } from 'vitest';

import reducer, { setContactData } from './ContactSlice';

describe('ContactSlice', () => {
  it('sets contact data', () => {
    const payload = { title: 'Contact' };
    expect(reducer(null, setContactData(payload))).toEqual(payload);
  });
});
