import React from 'react';

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Work from './Work';

vi.mock('../../animation/reveal/Reveal.jsx', () => ({
  default: ({ children }) => <div>{children}</div>,
}));

vi.mock('../../animation/ribbonMark/RibbonMark.jsx', () => ({
  default: () => <div data-testid="ribbon-mark" />,
}));

describe('Work', () => {
  it('renders work cards and stack labels', () => {
    render(
      <Work
        globalState={{
          work: {
            tag: 'Work',
            title: 'Selected projects',
            desc: 'Recent launches',
            workItems: [{ title: 'Platform', desc: 'A platform', status: 'Live', statusType: 'live', stack: ['React', 'Node'] }],
          },
        }}
        dispatch={() => {}}
      />
    );

    expect(screen.getByText('Selected projects')).toBeInTheDocument();
    expect(screen.getByText('Platform')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });
});
