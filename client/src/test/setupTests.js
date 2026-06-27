import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

const mockAxios = {
  get: vi.fn(),
  post: vi.fn(),
};

vi.mock('axios', () => ({
  default: mockAxios,
}));

class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }

  observe(target) {
    this.target = target;
    this.callback([{ isIntersecting: true, target }]);
  }

  unobserve() {}

  disconnect() {}
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

export { mockAxios };
