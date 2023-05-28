import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import PropertyFeatures from './PropertyFeatures';

const oneFeatures = {
  wifi: false,
  parking: false,
  breakfast: true,
  pets: false,
};
const twoFeatures = {
  wifi: true,
  parking: false,
  breakfast: true,
  pets: false,
};
const noFeatures = {
  wifi: false,
  parking: false,
  breakfast: false,
  pets: false,
};

describe('PropertyFeatures', () => {
  it('Renders without errors and display one truthy feature', () => {
    render(
      <BrowserRouter>
        <PropertyFeatures features={oneFeatures} />
      </BrowserRouter>
    );
    expect(screen.queryByText('What is included')).toBeInTheDocument();
    expect(screen.queryByText('Breakfast')).toBeInTheDocument();
    expect(screen.queryByText('Pets allowed')).not.toBeInTheDocument();
    expect(screen.queryByText('Parking')).not.toBeInTheDocument();
    expect(screen.queryByText('Wifi')).not.toBeInTheDocument();
  });
  it('Renders without errors and display two truthy feature', () => {
    render(
      <BrowserRouter>
        <PropertyFeatures features={twoFeatures} />
      </BrowserRouter>
    );
    expect(screen.queryByText('What is included')).toBeInTheDocument();
    expect(screen.queryByText('Breakfast')).toBeInTheDocument();
    expect(screen.queryByText('Pets allowed')).not.toBeInTheDocument();
    expect(screen.queryByText('Parking')).not.toBeInTheDocument();
    expect(screen.queryByText('Wifi')).toBeInTheDocument();
  });
  it('Renders without errors and display no feature on falsy argument', () => {
    render(
      <BrowserRouter>
        <PropertyFeatures features={noFeatures} />
      </BrowserRouter>
    );
    expect(screen.queryByText('What is included')).toBeInTheDocument();
    expect(screen.queryByText('Breakfast')).not.toBeInTheDocument();
    expect(screen.queryByText('Pets allowed')).not.toBeInTheDocument();
    expect(screen.queryByText('Parking')).not.toBeInTheDocument();
    expect(screen.queryByText('Wifi')).not.toBeInTheDocument();
  });
});
