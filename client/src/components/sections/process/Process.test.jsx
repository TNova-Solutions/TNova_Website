import React from 'react';

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Process from './Process';

vi.mock('../../animation/reveal/Reveal.jsx', () => ({
  default: ({ children }) => <div>{children}</div>,
}));

describe('Process', () => {
  it('renders the process steps', () => {
    render(
      <Process
        globalState={{
          process: {
            tag: 'Process',
            title: 'How we work',
            desc: 'A focused delivery approach',
            processSteps: [{ n: 1, title: 'Discover', desc: 'Learn the product.' }],
          },
        }}
        dispatch={() => {}}
      />
    );

    expect(screen.getByText('How we work')).toBeInTheDocument();
    expect(screen.getByText('Discover')).toBeInTheDocument();
    expect(screen.getByText('Learn the product.')).toBeInTheDocument();
  });
});
