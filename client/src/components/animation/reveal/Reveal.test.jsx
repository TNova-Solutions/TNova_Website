import React from 'react';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Reveal from './Reveal';

describe('Reveal', () => {
  it('renders children with the reveal wrapper', () => {
    render(<Reveal><span>Shown content</span></Reveal>);

    expect(screen.getByText('Shown content')).toBeInTheDocument();
  });
});
