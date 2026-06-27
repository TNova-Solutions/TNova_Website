import React from 'react';

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import CtaBand from './CtaBand';

vi.mock('../../animation/reveal/Reveal.jsx', () => ({
  default: ({ children }) => <div>{children}</div>,
}));

describe('CtaBand', () => {
  it('renders the call to action copy', () => {
    render(
      <CtaBand
        globalState={{
          ctaBand: { title: 'Ready to ship?', desc: 'Let’s talk' },
          contact: { contact: { email: 'hello@tnova.com' } },
        }}
        dispatch={() => {}}
      />
    );

    expect(screen.getByText('Ready to ship?')).toBeInTheDocument();
    expect(screen.getByText('Let’s talk')).toBeInTheDocument();
  });
});
