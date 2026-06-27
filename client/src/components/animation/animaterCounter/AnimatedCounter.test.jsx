import React from 'react';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import AnimatedCounter from './AnimatedCounter';

describe('AnimatedCounter', () => {
  it('renders the initial value and suffix', () => {
    render(<AnimatedCounter value={5} suffix="%" />);

    expect(screen.getAllByText((_, node) => node?.textContent === '0%').length).toBeGreaterThan(0);
  });
});
