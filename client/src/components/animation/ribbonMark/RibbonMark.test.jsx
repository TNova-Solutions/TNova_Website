import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import RibbonMark from './RibbonMark';

describe('RibbonMark', () => {
  it('renders the brand image with the provided size and className', () => {
    render(<RibbonMark size={72} className="brand-mark" />);

    const image = screen.getByAltText('TNova Solutions');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('width', '72');
    expect(image).toHaveAttribute('height', '72');
    expect(image).toHaveClass('brand-mark');
  });
});
