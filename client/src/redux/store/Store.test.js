import { describe, expect, it } from 'vitest';

import { store } from './Store';

describe('Store', () => {
  it('creates the expected reducer branches', () => {
    const state = store.getState();

    expect(state).toHaveProperty('capabilities');
    expect(state).toHaveProperty('contact');
    expect(state).toHaveProperty('ctaBand');
    expect(state).toHaveProperty('footer');
    expect(state).toHaveProperty('hero');
    expect(state).toHaveProperty('process');
    expect(state).toHaveProperty('team');
    expect(state).toHaveProperty('work');
    expect(state).toHaveProperty('user');
  });
});
