import React from 'react';

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Team from './Team';

vi.mock('../../animation/reveal/Reveal.jsx', () => ({
  default: ({ children }) => <div>{children}</div>,
}));

describe('Team', () => {
  it('renders founders and their bios', () => {
    render(
      <Team
        globalState={{
          team: {
            tag: 'Team',
            title: 'Meet the founders',
            desc: 'A small expert team',
            founders: [{ name: 'Ari', role: 'Founder', bio: 'Builds products', initials: 'AR', image: '' }],
          },
        }}
        dispatch={() => {}}
      />
    );

    expect(screen.getByText('Meet the founders')).toBeInTheDocument();
    expect(screen.getByText('Ari')).toBeInTheDocument();
    expect(screen.getByText('Builds products')).toBeInTheDocument();
  });
});
