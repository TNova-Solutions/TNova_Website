import { describe, expect, it } from 'vitest';

import reducer, { setTrainingData } from './TrainingSlice';

describe('TrainingSlice', () => {
  it('sets hero data', () => {
    const payload = { title: 'Hero' };
    expect(reducer(null, setTrainingData(payload))).toEqual(payload);
  });
});
