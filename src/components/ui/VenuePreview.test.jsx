import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import VenuePreview from './VenuePreview';

const data = {
  description: 'cola e nice',
  id: 'fef087c4-4c6c-4d0c-802d-513709b166c4',
  location: { city: 'Unknown', country: 'Unknown', lat: 0, lng: 0 },
  maxGuests: 4,
  media: ['https://source.unsplash.com/1600x900/?hotel'],
  meta: { wifi: false, parking: false, breakfast: false, pets: false },
  name: 'cola zero',
  price: 2,
  rating: 0,
};

describe('VenuePreview', () => {
  it('Renders without errors', () => {
    render(
      <BrowserRouter>
        <VenuePreview data={data} />
      </BrowserRouter>
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      data.name
    );
    expect(screen.getByText('Book your dream vacation:')).toBeInTheDocument();
    expect(screen.getByText('Book now')).toHaveAttribute('type', 'submit');
  });
});
