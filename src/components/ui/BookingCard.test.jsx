import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import BookingCard from './BookingCard';

const bookings = [
  {
    dateFrom: '2023-05-24T21:00:00.000Z',
    dateTo: '2023-05-26T21:00:00.000Z',
    guests: 1,
    id: 'b9cf1337-b541-46a4-9ced-ec1e1c694c6a',
    venue: {
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
  },
];
const noBookings = [];

describe('BookingCard', () => {
  it('Renders without errors with bookings', () => {
    render(
      <BrowserRouter>
        <BookingCard bookings={bookings} />
      </BrowserRouter>
    );
    expect(screen.getByText('My bookings')).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: bookings[0].venue.name })
    ).toHaveAttribute('src', bookings[0].venue.media[0]);
  });
  it('Renders without errors on no bookings', () => {
    render(
      <BrowserRouter>
        <BookingCard bookings={noBookings} />
      </BrowserRouter>
    );
    expect(
      screen.getByText("You don't have any booked venues")
    ).toBeInTheDocument();
  });
});
