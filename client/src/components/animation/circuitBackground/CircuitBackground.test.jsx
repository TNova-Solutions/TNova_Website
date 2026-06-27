import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import CircuitBackground from './CircuitBackground';

describe('CircuitBackground', () => {
  it('renders the decorative circuit grid and pulse elements', () => {
    const { container } = render(<CircuitBackground />);

    expect(container.querySelector('.tn-circuit-wrap')).toBeInTheDocument();
    expect(container.querySelector('.tn-circuit-grid')).toBeInTheDocument();
    expect(container.querySelectorAll('.tn-pulse-h, .tn-pulse-v')).toHaveLength(19);
  });
});
