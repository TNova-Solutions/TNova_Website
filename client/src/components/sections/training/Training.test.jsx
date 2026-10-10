import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import defaultContent from '../../../constants/defaultContent';

import Training from './Training';

vi.mock('../../animation/reveal/Reveal.jsx', () => ({ default: ({ children }) => <div>{children}</div> }));
vi.mock('../../animation/reveal/Reveal', () => ({ default: ({ children }) => <div>{children}</div> }));

describe('Training', () => {
  it('shows the bootcamp tracks and the trainer-provisioning offer', () => {
    render(<Training globalState={{ training: defaultContent.training }} dispatch={() => {}} />);
    expect(screen.getByText('MERN Full-Stack')).toBeInTheDocument();
    expect(screen.getByText('Java Full-Stack')).toBeInTheDocument();
    expect(screen.getByText('Python Full-Stack')).toBeInTheDocument();
    expect(screen.getByText(/trainer provisioning/i)).toBeInTheDocument();
  });

  it('preselects the "trainer" enquiry type when requesting a trainer', async () => {
    const dispatch = vi.fn();
    render(<Training globalState={{ training: defaultContent.training }} dispatch={dispatch} />);
    await userEvent.click(screen.getByRole('link', { name: /request a trainer/i }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ payload: 'trainer' }));
  });
});
