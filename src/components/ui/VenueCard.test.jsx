import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import VenueCard from './VenueCard';

const venues = [
  {
    description: 'cola e nice',
    id: 'fef087c4-4c6c-4d0c-802d-513709b166c4',
    location: { city: 'Unknown', country: 'Unknown', lat: 0, lng: 0 },
    maxGuests: 4,
    media: ['https://source.unsplash.com/1600x900/?hotel'],
    meta: { wifi: false, parking: false, breakfast: false, pets: false },
    name: 'cola zero',
    price: 2,
    rating: 0,
  },
];

describe('VenueCard', () => {
  it('Renders without errors', () => {
    render(
      <BrowserRouter>
        <VenueCard venues={venues} />
      </BrowserRouter>
    );
    expect(screen.getByText(venues[0].name)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Home image' })).toHaveAttribute(
      'src',
      venues[0].media[0]
    );
  });
});
