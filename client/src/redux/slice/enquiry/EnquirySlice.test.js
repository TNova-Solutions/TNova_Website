import { describe, expect, it } from 'vitest';

import reducer, { setInterest } from './EnquirySlice';

describe('EnquirySlice', () => {
  it('defaults to project and updates the interest', () => {
    expect(reducer(undefined, { type: 'init' })).toEqual({ interest: 'project' });
    expect(reducer({ interest: 'project' }, setInterest('trainer'))).toEqual({ interest: 'trainer' });
  });
  it('falls back to project for empty values', () => {
    expect(reducer({ interest: 'trainer' }, setInterest(''))).toEqual({ interest: 'project' });
  });
});
