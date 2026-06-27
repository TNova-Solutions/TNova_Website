import React from 'react';

import { render, screen } from '@testing-library/react';
import { describe, expect, it, beforeEach, vi } from 'vitest';

import { mockAxios } from '../../../test/setupTests';

import Hero from './Hero';

vi.mock('../../animation/terminal/Terminal.jsx', () => ({
  default: () => <div data-testid="terminal-mock" />,
}));

vi.mock('../../animation/animaterCounter/AnimatedCounter.jsx', () => ({
  default: ({ value, suffix = '' }) => <span>{`${value}${suffix}`}</span>,
}));

vi.mock('../../animation/circuitBackground/CircuitBackground.jsx', () => ({
  default: () => <div data-testid="circuit-background" />,
}));

describe('Hero', () => {
  beforeEach(() => {
    mockAxios.get.mockResolvedValue({ data: { content: [{ head: { title: 'Launch', accent: ' faster' }, subHead: { desc: 'Build faster' } }], stats: [{ label: 'Years', value: 5, duration: 1000, isYear: true }] } });
  });

  it('renders hero content and primary actions', async () => {
    render(<Hero globalState={{ hero: { content: [{ head: { title: 'Launch', accent: ' faster' }, subHead: { desc: 'Build faster' } }], stats: [{ label: 'Years', value: 5, duration: 1000, isYear: true }] } }} dispatch={() => {}} />);

    expect(screen.getByText('Launch')).toBeInTheDocument();
    expect(screen.getByText('faster')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /get a quote/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /see our work/i })).toBeInTheDocument();
    expect(screen.getByTestId('terminal-mock')).toBeInTheDocument();
  });
});
