import React from 'react';

import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import DevelopmentPage from './DevelopmentPage';

const mockedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('DevelopmentPage', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockedNavigate.mockReset();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('renders the placeholder content and navigates back home with a smooth scroll', () => {
    const scrollIntoView = vi.fn();
    const getElementByIdSpy = vi.spyOn(document, 'getElementById').mockImplementation((id) => {
      if (id === 'capabilities') {
        return { scrollIntoView };
      }
      return null;
    });

    render(<DevelopmentPage />);

    expect(screen.getByRole('heading', { name: /this page is under development/i })).toBeInTheDocument();
    expect(screen.getByText(/we're currently building something amazing/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /back to home/i }));

    expect(mockedNavigate).toHaveBeenCalledWith('/');

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    getElementByIdSpy.mockRestore();
  });
});
