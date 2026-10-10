import { describe, expect, it } from 'vitest';

import reducer, { setInterest, setRole } from './EnquirySlice';

describe('EnquirySlice', () => {
  it('defaults to project and updates the interest', () => {
    expect(reducer(undefined, { type: 'init' })).toEqual({ interest: 'project', role: '' });
    expect(reducer({ interest: 'project', role: '' }, setInterest('trainer'))).toEqual({ interest: 'trainer', role: '' });
  });
  it('stores the selected application role', () => {
    expect(reducer(undefined, setRole('technical-trainer'))).toEqual({ interest: 'project', role: 'technical-trainer' });
  });
  it('falls back to project for empty values', () => {
    expect(reducer({ interest: 'trainer' }, setInterest(''))).toEqual({ interest: 'project' });
  });
});
