import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import App from './App';
import { store } from './redux/store/Store';

vi.mock('./components/sections/capabilities/Capabilities', () => ({
  default: () => <div>Capabilities</div>,
}));
vi.mock('./components/sections/contact/Contact', () => ({
  default: () => <div>Contact</div>,
}));
vi.mock('./components/sections/ctaBand/CtaBand', () => ({
  default: () => <div>CtaBand</div>,
}));
vi.mock('./components/sections/footer/Footer', () => ({
  default: () => <div>Footer</div>,
}));
vi.mock('./components/sections/hero/Hero', () => ({
  default: () => <div>Hero</div>,
}));
vi.mock('./components/sections/marquee/Marquee', () => ({
  default: () => <div>Marquee</div>,
}));
vi.mock('./components/sections/nav/Nav', () => ({
  default: () => <div>Nav</div>,
}));
vi.mock('./components/sections/process/Process', () => ({
  default: () => <div>Process</div>,
}));
vi.mock('./components/sections/team/Team', () => ({
  default: () => <div>Team</div>,
}));
vi.mock('./components/sections/work/Work', () => ({
  default: () => <div>Work</div>,
}));
vi.mock('./pages/DevelopmentPage', () => ({
  default: () => <div>Development page content</div>,
}));

function renderApp() {
  return render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

describe('App', () => {
  beforeEach(() => {
    cleanup();
    window.history.pushState({}, '', '/');
  });

  it('renders the home route with the main marketing sections', () => {
    renderApp();

    expect(screen.getByText('Hero')).toBeInTheDocument();
    expect(screen.getByText('Capabilities')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders the development route when the path matches', () => {
    window.history.pushState({}, '', '/development');
    renderApp();

    expect(screen.getByText('Development page content')).toBeInTheDocument();
  });
});
