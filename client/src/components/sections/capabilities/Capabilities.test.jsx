import React from 'react';

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import Capabilities from './Capabilities';

vi.mock('../../animation/reveal/Reveal.jsx', () => ({
  default: ({ children }) => <div>{children}</div>,
}));

describe('Capabilities', () => {
  it('renders services with a link to the contact form', () => {
    render(
      <MemoryRouter>
        <Capabilities
          globalState={{
            capabilities: {
              tag: 'Capabilities',
              title: 'What we do',
              desc: 'A broad set of offerings',
              services: [{ title: 'Web apps', desc: 'Custom apps', image: 'x', tags: ['React'] }],
            },
          }}
          dispatch={() => {}}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('What we do')).toBeInTheDocument();
    expect(screen.getByText('Web apps')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /discuss this/i })).toHaveAttribute('href', '#contact');
  });
});
