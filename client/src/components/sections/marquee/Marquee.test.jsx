import React from 'react';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Marquee from './Marquee';

describe('Marquee', () => {
  it('renders the marquee content twice for the scrolling track', () => {
    render(
      <Marquee
        globalState={{
          hero: {
            marquee: [
              { bold: 'Design', rest: 'Systems' },
              { bold: 'Launch', rest: 'Fast' },
            ],
          },
        }}
      />
    );

    expect(screen.getAllByText(/Design/i)).toHaveLength(2);
    expect(screen.getAllByText(/Launch/i)).toHaveLength(2);
    expect(screen.getAllByText(/Systems/i)).toHaveLength(2);
    expect(screen.getAllByText(/Fast/i)).toHaveLength(2);
  });
});
