import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import defaultContent from '../../../constants/defaultContent';

import Footer from './Footer';

describe('Footer links (regressions)', () => {
  it('links to real in-page anchors, not to relative paths named after the label', () => {
    render(<Footer globalState={{ footer: defaultContent.footer }} />);
    expect(screen.getByRole('link', { name: 'Our Work' })).toHaveAttribute('href', '#work');
    expect(screen.getByRole('link', { name: 'Training & Trainers' })).toHaveAttribute('href', '#training');
    expect(screen.getByRole('link', { name: 'Products' })).toHaveAttribute('href', '#products');
  });

  it('the phone link has a number (was tel:undefined)', () => {
    render(<Footer globalState={{ footer: defaultContent.footer }} />);
    expect(screen.getByRole('link', { name: '+91 99448 80268' })).toHaveAttribute('href', 'tel:+919944880268');
  });
});
