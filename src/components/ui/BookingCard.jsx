import { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import getNumberOfNights from '../../utils/getNumberOfNights';
import apiDelete from '../../utils/api/apiDelete';

export default function BookingCard({ bookings }) {
  const [updatedBookings, setUpdatedBookings] = useState(bookings);

  const deleteBooking = async (id) => {
    const response = await apiDelete(
      `https://api.noroff.dev/api/v1/holidaze/bookings/${id}`
    );
    response === 204 &&
      setUpdatedBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== id)
      );
  };

  return (
    <div className="flex flex-col bg-white shadow-md">
      <div className="flex-1 px-2 py-6 sm:px-6">
        <h2 className="text-lg font-semibold text-gray-900">My bookings</h2>
        {updatedBookings.length === 0 && (
          <h3 className="m-5 text-md font-medium text-gray-500">
            You don't have any booked venues
          </h3>
        )}
        <div className="mt-8">
          <ul role="list" className="divide-y divide-gray-200">
            {updatedBookings.map((booking) => {
              const totalPrice =
                getNumberOfNights(
                  new Date(booking.dateFrom),
                  new Date(booking.dateTo)
                ) * booking.venue.price;
              return (
                <li key={booking.id} className="flex flex-wrap py-6">
                  <div className="h-full w-full sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={booking.venue.media[0]}
                      alt={booking.venue.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="mx-1 sm:mx-3 flex w-full sm:flex-1 flex-col">
                    <div className="py-3 sm:p-0">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <Link to={`/venue/${booking.venue.id}`}>
                            {booking.venue.name}
                          </Link>
                        </h3>
                        <p className="ml-4">Total: ${totalPrice}</p>
                      </div>
                      <div className="flex text-sm text-gray-500">
                        <p>{booking.venue.location.city}</p>
                        <p>, {booking.venue.location.country}</p>
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div>
                        <p className="text-gray-500">
                          <span className="text-gray-900">From: </span>
                          {format(new Date(booking.dateFrom), 'dd/MM/yyyy')}
                        </p>
                        <p className="text-gray-500">
                          <span className="text-gray-900">To: </span>
                          {format(new Date(booking.dateTo), 'dd/MM/yyyy')}
                        </p>
                      </div>
                      <div className="flex">
                        <button
                          type="button"
                          className="shadow-sm font-semibold text-gray-900 hover:shadow-md bg-red-main"
                          onClick={() => deleteBooking(booking.id)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
