import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, beforeEach, vi } from 'vitest';

import { mockAxios } from '../../../test/setupTests';

import Contact from './Contact';

vi.mock('../../animation/reveal/Reveal.jsx', () => ({
  default: ({ children }) => <div>{children}</div>,
}));

describe('Contact', () => {
  beforeEach(() => {
    mockAxios.get.mockResolvedValue({ data: { tag: 'Contact', title: 'Let’s build', desc: 'Get in touch', contact: { email: 'hello@tnova.com', phone: '+1', phoneHref: '+1', location: 'Remote' } } });
    mockAxios.post.mockResolvedValue({ data: { message: 'Thanks!', submitMsg: 'Message sent' } });
  });

  it('renders contact details and submits the form', async () => {
    const user = userEvent.setup();

    render(<Contact globalState={{ contact: { tag: 'Contact', title: 'Let’s build', desc: 'Get in touch', contact: { email: 'hello@tnova.com', phone: '+1', phoneHref: '+1', location: 'Remote' } }, user: { message: 'Thanks!', submitMsg: 'Message sent' } }} dispatch={() => {}} />);

    expect(screen.getByText('Let’s build')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'hello@tnova.com' })).toBeInTheDocument();

    await user.type(screen.getByLabelText(/name/i), 'Jane');
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/project details/i), 'A new platform');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => expect(mockAxios.post).toHaveBeenCalled());
    expect(await screen.findByText('Thanks!')).toBeInTheDocument();
  });
});
