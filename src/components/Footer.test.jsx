import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Footer from './Footer';

describe('Footer', () => {
  it('Renders without errors', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(screen.getByText('H')).toBeInTheDocument();
    expect(screen.getByText('ME is here')).toBeInTheDocument();
    expect(
      screen.getByText('©2023 Viorel Lazari. All rights reserved.')
    ).toBeInTheDocument();
  });
});
