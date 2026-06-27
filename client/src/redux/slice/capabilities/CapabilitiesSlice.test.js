import { describe, expect, it } from 'vitest';

import reducer, { setCapabilitiesData } from './CapabilitiesSlice';

describe('CapabilitiesSlice', () => {
  it('sets capabilities data', () => {
    const payload = { title: 'Capabilities' };
    expect(reducer(null, setCapabilitiesData(payload))).toEqual(payload);
  });
});
