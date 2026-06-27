import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import Nav from './Nav';

vi.mock('../../animation/ribbonMark/RibbonMark.jsx', () => ({
  default: ({ size }) => <div data-testid="ribbon-mark">{size}</div>,
}));

describe('Nav', () => {
  it('renders navigation links and toggles the mobile menu', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /tnova solutions/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /start a project/i })).toBeInTheDocument();

    const toggle = screen.getByRole('button', { name: /open menu/i });
    await user.click(toggle);

    expect(screen.getByRole('dialog', { name: '' })).toBeInTheDocument();
    expect(screen.getAllByText('Capabilities').length).toBeGreaterThan(0);
  });
});
