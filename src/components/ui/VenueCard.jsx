import React from "react";
import { Link } from "react-router-dom";
import { HomeModernIcon } from "@heroicons/react/24/solid";
import StarAverageRating from "./StarAverageRating";

export default function venueCard(props) {
	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 className="sr-only">Rental homes and apartments</h2>
				<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
					{props.venues.map((venue) => (
						<Link key={venue.id} to={`/venue/${venue.id}`} className="group">
							<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
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
							<h3 className="mt-4 text-md font-bold text-blue-main">
								{venue.location.country}, {venue.location.city}
							</h3>
							<h4 className="my-1 text-sm text-blue-main">{venue.name}</h4>
							<StarAverageRating rating={venue.rating} />
							<p className="mt-1 text-lg text-red-main font-bold text-blue-main">${venue.price}</p>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
