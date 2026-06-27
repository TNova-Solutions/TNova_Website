import { describe, expect, it } from 'vitest';

import reducer, { setTeamData } from './TeamSlice';

describe('TeamSlice', () => {
  it('sets team data', () => {
    const payload = { title: 'Team' };
    expect(reducer(null, setTeamData(payload))).toEqual(payload);
  });
});
