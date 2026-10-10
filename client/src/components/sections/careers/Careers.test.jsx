import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import defaultContent from '../../../constants/defaultContent';
import { mockAxios } from '../../../test/setupTests';

import Careers from './Careers';

vi.mock('../../animation/reveal/Reveal', () => ({ default: ({ children }) => <div>{children}</div> }));

const state = { careers: defaultContent.careers, enquiry: { role: 'general' } };

describe('Careers', () => {
  it('lists open roles and an apply form', () => {
    render(<Careers globalState={state} dispatch={() => {}} />);
    expect(screen.getByRole('heading', { name: 'Software Developer Trainee' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit application/i })).toBeInTheDocument();
  });

  it('preselects the role chosen from a job card', async () => {
    const dispatch = vi.fn();
    render(<Careers globalState={state} dispatch={dispatch} />);
    await userEvent.click(screen.getByRole('link', { name: /apply for technical trainer/i }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ payload: 'technical-trainer' }));
  });

  it('submits an application and shows confirmation', async () => {
    mockAxios.post.mockResolvedValue({ data: { submitMsg: 'We have received your application.' } });
    render(<Careers globalState={state} dispatch={() => {}} />);
    await userEvent.type(screen.getByLabelText(/full name/i), 'Ravi Kumar');
    await userEvent.type(screen.getByLabelText(/^email/i), 'ravi@example.com');
    await userEvent.type(screen.getByLabelText(/about you/i), 'I build full-stack apps.');
    await userEvent.click(screen.getByRole('button', { name: /submit application/i }));

    await waitFor(() => expect(mockAxios.post).toHaveBeenCalled());
    expect(mockAxios.post.mock.calls[0][0]).toMatch(/api\/careers\/apply$/);
    expect(await screen.findByRole('status')).toHaveTextContent('We have received your application.');
  });

  it('shows the server error when the application is rejected', async () => {
    mockAxios.post.mockRejectedValue({ response: { status: 400, data: { error: 'Please enter a valid email address.' } } });
    render(<Careers globalState={state} dispatch={() => {}} />);
    await userEvent.type(screen.getByLabelText(/full name/i), 'R');
    await userEvent.type(screen.getByLabelText(/^email/i), 'ravi@example.com');
    await userEvent.type(screen.getByLabelText(/about you/i), 'hi');
    await userEvent.click(screen.getByRole('button', { name: /submit application/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent('valid email');
  });

  it('still offers a general application when no roles are listed', () => {
    render(<Careers globalState={{ careers: { ...defaultContent.careers, openings: [] } }} dispatch={() => {}} />);
    expect(screen.getByText(/no roles are listed/i)).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /general application/i })).toBeInTheDocument();
  });
});
