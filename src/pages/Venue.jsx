import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import getVenues from "../hooks/apiGet";
import Loader from "../components/ui/Loader";
import ImageSlider from "../components/ui/ImageSlider";
import PropertyFeatures from "../components/ui/PropertyFeatures";
import StarAverageRating from "../components/ui/StarAverageRating";
import BookingData from "../components/form/BookingData";
import MapLeaflet from "../components/ui/MapLeaflet";

export default function Venue() {
	const { id } = useParams();
	const { data, isLoading, error } = getVenues(`https://api.noroff.dev/api/v1/holidaze/venues/${id}?_bookings=true`);

	if (isLoading) {
		return <Loader />;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}
	return (
		<div className="bg-white">
			<div className="pt-6">
				{/* <nav aria-label="Breadcrumb">
					<ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
						<li>
							<div className="flex items-center">
								<a href="" className="mr-2 text-sm font-medium text-gray-900">
									Home
								</a>
								<svg
									width={16}
									height={20}
									viewBox="0 0 16 20"
									fill="currentColor"
									aria-hidden="true"
									className="h-5 w-4 text-gray-300"
								>
									<path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
								</svg>
							</div>
						</li>
						<li className="text-sm">
							<a href="" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
								{}
							</a>
						</li>
					</ol>
				</nav> */}
				<ImageSlider venue={data} />
				<div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
					<div className="lg:col-span-2 lg:border-r lg:border-red-main lg:pr-8">
						<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{data.name}</h1>
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
							Price: ${data.price} <span className="text-lg text-gray-500">/ night</span>
						</p>
						<BookingData venue={data} />
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
							<h3 className="pb-2 text-md text-blue-main font-semibold">Venue location:</h3>
							<MapLeaflet venue={data} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
