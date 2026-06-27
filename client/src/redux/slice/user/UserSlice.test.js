import { describe, expect, it } from 'vitest';

import reducer, { setUserData } from './UserSlice';

describe('UserSlice', () => {
  it('sets user data', () => {
    const payload = { message: 'Submitted' };
    expect(reducer(null, setUserData(payload))).toEqual(payload);
  });
});
