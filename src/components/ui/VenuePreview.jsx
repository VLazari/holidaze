import React from 'react';
import ImageSlider from '../../components/ui/ImageSlider';
import PropertyFeatures from '../../components/ui/PropertyFeatures';
import StarAverageRating from '../../components/ui/StarAverageRating';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MapLeaflet from '../../components/ui/MapLeaflet';

export default function VenuePreview({ data }) {
  return (
    <div className="bg-white">
      <div className="pt-6">
        <ImageSlider venue={data} />
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-red-main lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {data.name}
            </h1>
            <h3 className="pb-2 text-md font-medium italic">
              {data.location.city}, {data.location.country}
            </h3>
            <p>Max {data.maxGuests} guests</p>
            <div className="mt-4">
              <StarAverageRating rating={data.rating} />
            </div>
          </div>
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Venue information and booking</h2>
            <p className="mx-1 text-2xl font-semibold tracking-tight text-gray-900">
              Price: ${data.price}{' '}
              <span className="text-lg text-gray-500">/ night</span>
            </p>
            <section className="mt-5 p-10 border ">
              <h3 className="pb-6 text-blue-main text-lg font-semibold">
                Book your dream vacation:
              </h3>
              <span className="m-1 text-gray-500 italic">
                Select booking period:
              </span>
              <DatePicker
                className="py-3 text-sm text-center text-blue-main border rounded-lg border-slate-300 shadow-sm w-full outline-blue-main"
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                selectsRange={true}
                monthsShown={1}
                placeholderText="Select dates"
              />
              <div className="mx-auto my-8 md:mx-0">
                <span className="text-gray-500 select-none mr-5">Guests: </span>
                <button className="py-0.5 px-3 border-2 border-slate-300 rounded-lg shadow-md transition ease-in-out delay-100 focus:outline-none">
                  -
                </button>
                <span className="mx-4 select-none">1</span>
                <button className="py-0.5 px-3 border-2 border-slate-300 rounded-lg shadow-md transition ease-in-out delay-100 focus:outline-none">
                  +
                </button>
              </div>
              <p className="mx-1 text-xl font-semibold tracking-tight text-blue-main">
                <span className="text-md text-gray-500">Total price: </span> $
                {data.price}
              </p>
              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-red-main px-8 py-3 text-base font-medium text-blue-main outline-none hover:ring-2 hover:ring-blue-main ring-offset-1"
              >
                Book now
              </button>
            </section>
          </div>
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-red-main lg:pb-16 lg:pr-8 lg:pt-6">
            <div>
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6">
                <p className="text-base text-gray-900">{data.description}</p>
              </div>
            </div>
            <PropertyFeatures features={data.meta} />
            <div className="mt-10">
              <h3 className="pb-2 text-md text-blue-main font-semibold">
                Venue location:
              </h3>
              <MapLeaflet venue={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
