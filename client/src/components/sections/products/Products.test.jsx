import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import defaultContent from '../../../constants/defaultContent';

import Products from './Products';

vi.mock('../../animation/reveal/Reveal', () => ({ default: ({ children }) => <div>{children}</div> }));

describe('Products', () => {
  it('lists Internal Hub and Interview Platform with an honest status', () => {
    render(<Products globalState={{ products: defaultContent.products }} dispatch={() => {}} />);
    expect(screen.getByText('TNova Internal Hub')).toBeInTheDocument();
    expect(screen.getByText('TNova Interview Platform')).toBeInTheDocument();
    expect(screen.getAllByText('In development')).toHaveLength(2);
  });

  it('offers early access until a liveUrl is configured, then links to the live app', async () => {
    const dispatch = vi.fn();
    const { rerender } = render(<Products globalState={{ products: defaultContent.products }} dispatch={dispatch} />);
    await userEvent.click(screen.getAllByRole('link', { name: /request early access/i })[1]);
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ payload: 'interview-platform' }));

    const live = { ...defaultContent.products, items: [{ ...defaultContent.products.items[0], status: 'Live', statusType: 'live', liveUrl: 'https://hub.example.com' }] };
    rerender(<Products globalState={{ products: live }} dispatch={dispatch} />);
    expect(screen.getByRole('link', { name: /open app/i })).toHaveAttribute('href', 'https://hub.example.com');
  });
});
