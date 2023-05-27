import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Dialog, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { HomeModernIcon } from '@heroicons/react/24/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import apiAuthGet from '../hooks/apiAuthGet';
import apiDelete from '../utils/api/apiDelete';
import Loader from '../components/ui/Loader';
import VenuePreview from '../components/ui/VenuePreview';
import EditVenue from '../components/ui/EditVenue';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

export default function UserVenues() {
  const userData = useSelector((state) => state.isLoggedIn.userData);
  const [reloadApi, setReloadApi] = useState(1);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [deleteError, setDeleteError] = useState(false);
  const { data, isLoading, error } = apiAuthGet(
    `https://api.noroff.dev/api/v1/holidaze/profiles/${userData.name}/venues?_bookings=true`,
    reloadApi
  );
  const onDelete = async (id) => {
    try {
      await apiDelete(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`);
      setReloadApi((reload) => reload + 1);
    } catch (error) {
      setDeleteError(true);
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return (
      <div className="mx-auto mt-10 text-red-600 text-lg font-bold">
        Sorry, something went wrong. {error.message}
      </div>
    );
  }
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:w-full md:px-4">
                  <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                      type="button"
                      className="absolute ring-0 md:ring-1 ring-gray-500 right-4 top-4 text-gray-500 hover:text-gray-600 hover:ring-2 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <VenuePreview data={preview} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <h1 className="text-xl md:text-3xl text-center font-semibold text-gray-900">
            Manage your venues
          </h1>
          <div className="py-5 flex items-center justify-end border-b-2">
            <Link
              to="/venue/add"
              className="mx-auto flex items-center justify-center rounded-md border border-transparent bg-blue-main px-8 py-2 text-base font-medium text-white outline-none hover:ring-2 hover:ring-blue-main ring-offset-1"
            >
              Add new
            </Link>
          </div>
          <div className="my-8 p-2">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {data.map((venue) => (
                  <li key={venue.id} className="py-6">
                    <div className="flex">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        {venue.media[0] ? (
                          <img
                            src={venue.media[0]}
                            alt="Home image"
                            className="h-full w-full object-cover object-center border group-hover:opacity-75 group-hover:border-blue-main"
                          />
                        ) : (
                          <HomeModernIcon className="h-full w-full object-cover object-center border group-hover:opacity-75 group-hover:border-blue-main" />
                        )}
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{venue.name}</h3>
                            <p className="ml-4 text-blue-main">
                              ${venue.price}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {venue.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="my-2 py-2 border-b-0">
                      {venue.bookings.length < 1 ? (
                        <p className="font-medium text-gray-900">No bookings</p>
                      ) : (
                        <>
                          <p className="font-medium text-gray-900">Bookings:</p>
                          {venue.bookings.map((booking) => (
                            <div className="flex items-center">
                              <p className="py-1 mr-3">
                                {booking.guests} guest(s)
                              </p>
                              <p className="text-gray-500 mr-3">
                                <span className="text-gray-900">From: </span>
                                {format(
                                  new Date(booking.dateFrom),
                                  'dd/MM/yyyy'
                                )}
                              </p>
                              <p className="text-gray-500">
                                <span className="text-gray-900">To: </span>
                                {format(new Date(booking.dateTo), 'dd/MM/yyyy')}
                              </p>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <div className="flex flex-1 justify-end text-sm">
                            {deleteError && (
                              <p className="text-sm text-red-600">
                                Something went wrong. Try again.
                              </p>
                            )}
                            <div className="flex">
                              <button
                                type="button"
                                className="mx-2 mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-blue-main px-6 py-2 text-sm font-medium text-white outline-none hover:ring-2 hover:ring-blue-main ring-offset-1"
                                onClick={() => {
                                  setOpen(true);
                                  setPreview(venue);
                                }}
                              >
                                Preview
                              </button>
                            </div>
                            <Disclosure.Button className="mx-2 mt-2 rounded-md border border-transparent bg-blue-main w-24 py-2 text-sm font-medium text-white outline-none hover:ring-2 hover:ring-blue-main ring-offset-1">
                              <div className="flex justify-between">
                                <span>Edit</span>
                                <ChevronUpIcon
                                  className={`${
                                    open ? 'rotate-180 transform' : ''
                                  } h-5 w-5`}
                                />
                              </div>
                            </Disclosure.Button>
                            <div className="flex">
                              <button
                                type="button"
                                className="mx-2 mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-red-main px-6 py-2 text-sm font-medium text-gray-900 outline-none hover:ring-2 hover:ring-blue-main ring-offset-1"
                                onClick={() => onDelete(venue.id)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                          <Disclosure.Panel className="text-gray-500">
                            <EditVenue
                              setReloadApi={setReloadApi}
                              venue={venue}
                            />
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
