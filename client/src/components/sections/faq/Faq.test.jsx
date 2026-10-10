import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import defaultContent from '../../../constants/defaultContent';

import Faq from './Faq';

vi.mock('../../animation/reveal/Reveal', () => ({ default: ({ children }) => <div>{children}</div> }));

describe('Faq', () => {
  it('renders every question as an expandable item', async () => {
    render(<Faq globalState={{ faq: defaultContent.faq }} />);
    const question = screen.getByText('Do we own the source code?');
    const item = question.closest('details');
    expect(item).not.toHaveAttribute('open');
    await userEvent.click(question);
    expect(item).toHaveAttribute('open');
    expect(screen.getAllByRole('group').length).toBe(defaultContent.faq.items.length);
  });
});
