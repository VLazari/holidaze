import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import StarAverageRating from './StarAverageRating';

const isRating = 3.2;
const noRating = 0;

describe('StarAverageRating', () => {
  it('Renders without errors when rating exist', () => {
    render(
      <BrowserRouter>
        <StarAverageRating rating={isRating} />
      </BrowserRouter>
    );
    expect(screen.getByText(`(${isRating})`)).toBeInTheDocument();
  });
  it('Renders without errors when rating does not exist', () => {
    render(
      <BrowserRouter>
        <StarAverageRating rating={noRating} />
      </BrowserRouter>
    );
    expect(screen.getByText('Not rated')).toBeInTheDocument();
  });
});
