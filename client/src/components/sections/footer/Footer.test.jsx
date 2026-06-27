import React from 'react';

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Footer from './Footer';

vi.mock('../../animation/ribbonMark/RibbonMark.jsx', () => ({
  default: () => <div data-testid="ribbon-mark" />,
}));

describe('Footer', () => {
  it('renders footer content and contact links', () => {
    render(
      <Footer
        globalState={{
          footer: {
            brandName: 'TNova',
            tagLine: 'Ship beautifully',
            footerItem: [{ title: 'Company', footerLink: [{ link: 'https://example.com' }] }],
            footerContact: { email: 'hello@tnova.com', phone: '+1', phoneHref: '+1', location: 'Remote' },
            footerBottom: { copyRights: '© 2026', website: 'tnova.com' },
          },
        }}
        dispatch={() => {}}
      />
    );

    expect(screen.getByText('TNova')).toBeInTheDocument();
    expect(screen.getByText('Ship beautifully')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'https://example.com' })).toBeInTheDocument();
  });
});
