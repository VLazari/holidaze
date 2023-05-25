import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import apiPostData from "../utils/api/apiPostData";

const schema = yup
	.object({
		venueName: yup.string().trim().required("Please enter the venue name"),
		description: yup.string().trim().required("Please enter the venue description"),
		venueImage: yup.array().of(yup.string().trim().url("Should be a valid image URL.")),
		price: yup.number().required("Please enter the price per night").min(1, "Please set a correct price. Minimum $1"),
		guests: yup.number().required(),
		country: yup.string().trim(),
		city: yup.string().trim(),
		lat: yup.number().min(-90, "Minimum latitude is: -90").max(90, "Maximum latitude is: 90"),
		lon: yup.number().min(-180, "Minimum longitude is: -180").max(180, "Maximum longitude is: 180"),
		wifi: yup.boolean(),
		parking: yup.boolean(),
		breakfast: yup.boolean(),
		pets: yup.boolean(),
	})
	.required();

export default function AddVenue() {
	const userData = useSelector((state) => state.isLoggedIn.userData);
	const [nrOfImages, setNrOfImages] = useState(1);
	const [isError, setIsError] = useState(false);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		const option = {
			name: data.venueName,
			description: data.description,
			price: data.price,
			maxGuests: data.guests,
			rating: Math.floor(Math.random() * 5) + 1,
			meta: {
				wifi: data.wifi,
				parking: data.parking,
				breakfast: data.breakfast,
				pets: data.pets,
			},
			location: {
				country: data.country,
				lat: data.lat,
				lng: data.lon,
			},
		};
		const images = data.venueImage.filter((image) => image !== "");
		if (images.length > 0) option.media = images;
		if (data.city !== "") option.city = data.city;
		const response = await apiPostData("https://api.noroff.dev/api/v1/holidaze/venues", option);
		response && response.id ? navigate(`/profiles/${userData.name}/venues`) : setIsError(true);
	};

	return (
		<form className="p-2 md:p-5" onSubmit={handleSubmit(onSubmit)}>
			<div className="space-y-12 p-5">
				<div className="border-b border-gray-900/10 pb-12">
					<h1 className="text-center text-2xl md:text-4xl font-bold text-blue-main">Add venue</h1>
					<p className="mt-5 text-sm leading-6 text-gray-600">Complete the form with your venue information.</p>
					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-4">
							<label htmlFor="venueName" className="block text-sm font-medium leading-6 text-gray-900">
								Venue name
								<span className="text-red-600"> *</span>
							</label>
							<div className="mt-2">
								<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-main sm:max-w-md">
									<input
										{...register("venueName")}
										type="text"
										name="venueName"
										id="venueName"
										autoComplete="venueName"
										placeholder="Venue name"
										className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
									/>
								</div>
								<p className="text-sm text-red-600">{errors.venueName?.message}</p>
							</div>
						</div>
						<div className="col-span-full">
							<label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
								Description
								<span className="text-red-600"> *</span>
							</label>
							<div className="mt-2">
								<textarea
									{...register("description")}
									id="description"
									name="description"
									placeholder="Short description of the venue"
									rows={3}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-main sm:text-sm sm:leading-6"
								/>
							</div>
							<p className="text-sm text-red-600">{errors.description?.message}</p>
						</div>
					</div>
				</div>
				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">Add venue photos</h2>
					{Array.from({ length: nrOfImages }, (_, index) => (
						<div key={index} className="mt-5 sm:col-span-4">
							<label htmlFor={`venueImage${index}`} className="block text-sm font-medium leading-6 text-gray-900">
								Venue photo url {index + 1}
							</label>
							<div className="mt-2">
								<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-main sm:max-w-md">
									<input
										{...register(`venueImage[${index}]`)}
										type="text"
										name={`venueImage[${index}]`}
										id={`venueImage[${index}]`}
										placeholder="Image URL"
										className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
									/>
								</div>
								<p className="text-sm text-red-600">{errors.venueImage?.[index]?.message}</p>
							</div>
						</div>
					))}
					<button
						type="button"
						className="mt-5 rounded-md border-blue-main bg-blue-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:ring-2 hover:ring-blue-main ring-offset-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-main"
						onClick={() => setNrOfImages(nrOfImages + 1)}
					>
						Add more photos
					</button>
				</div>
				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">Specifics</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">Set price, maximum number of guests and location.</p>
					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-3">
							<label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
								Price / night
								<span className="text-red-600"> *</span>
							</label>
							<div className="mt-2">
								<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-main sm:max-w-md">
									<span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$ </span>
									<input
										{...register("price")}
										type="text"
										name="price"
										id="price"
										className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
									/>
								</div>
								<p className="text-sm text-red-600">{errors.price?.message}</p>
							</div>
						</div>
						<div className="sm:col-span-3">
							<label htmlFor="guests" className="block text-sm font-medium leading-6 text-gray-900">
								Maximum number of guests
							</label>
							<div className="mt-2">
								<select
									{...register("guests")}
									id="guests"
									name="guests"
									autoComplete="guests"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-main sm:max-w-xs sm:text-sm sm:leading-6"
								>
									{Array.from({ length: 15 }, (_, index) => (
										<option key={index + 1}>{index + 1}</option>
									))}
								</select>
							</div>
						</div>
						<div className="sm:col-span-3">
							<label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
								Country
							</label>
							<div className="mt-2">
								<select
									{...register("country")}
									id="country"
									name="country"
									autoComplete="country-name"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-main sm:max-w-xs sm:text-sm sm:leading-6"
								>
									<option>Canada</option>
									<option>France</option>
									<option>Germany</option>
									<option>Norway</option>
									<option>UK</option>
									<option>United States</option>
								</select>
							</div>
						</div>
						<div className="sm:col-span-2 sm:col-start-1">
							<label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
								City
							</label>
							<div className="mt-2">
								<input
									{...register("city")}
									type="text"
									name="city"
									id="city"
									autoComplete="address-level2"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-main sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div className="sm:col-span-2">
							<label htmlFor="lat" className="block text-sm font-medium leading-6 text-gray-900">
								Latitude
							</label>
							<div className="mt-2">
								<input
									{...register("lat")}
									type="number"
									name="lat"
									id="lat"
									defaultValue={0}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-main sm:text-sm sm:leading-6"
								/>
							</div>
							<p className="text-sm text-red-600">{errors.lat?.message}</p>
						</div>
						<div className="sm:col-span-2">
							<label htmlFor="lon" className="block text-sm font-medium leading-6 text-gray-900">
								Longitude
							</label>
							<div className="mt-2">
								<input
									{...register("lon")}
									type="number"
									name="lon"
									id="lon"
									defaultValue={0}
									autoComplete="lon"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-main sm:text-sm sm:leading-6"
								/>
							</div>
							<p className="text-sm text-red-600">{errors.lon?.message}</p>
						</div>
					</div>
				</div>
				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">Features</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">Are any of the below features included.</p>
					<div className="mt-10 space-y-10">
						<fieldset>
							<legend className="text-sm font-semibold leading-6 text-gray-900">Features</legend>
							<div className="mt-6 space-y-6">
								<div className="relative flex gap-x-3">
									<div className="flex h-6 items-center">
										<input
											{...register("wifi")}
											id="wifi"
											name="wifi"
											type="checkbox"
											className="h-4 w-4 rounded border-gray-300 text-blue-main focus:ring-blue-main"
										/>
									</div>
									<div className="text-sm leading-6">
										<label htmlFor="wifi" className="font-medium text-gray-900">
											Wifi
										</label>
										<p className="text-gray-500">A free wifi is available.</p>
									</div>
								</div>
								<div className="relative flex gap-x-3">
									<div className="flex h-6 items-center">
										<input
											{...register("parking")}
											id="parking"
											name="parking"
											type="checkbox"
											className="h-4 w-4 rounded border-gray-300 text-blue-main focus:ring-blue-main"
										/>
									</div>
									<div className="text-sm leading-6">
										<label htmlFor="parking" className="font-medium text-gray-900">
											Parking
										</label>
										<p className="text-gray-500">Available parking spot.</p>
									</div>
								</div>
								<div className="relative flex gap-x-3">
									<div className="flex h-6 items-center">
										<input
											{...register("breakfast")}
											id="breakfast"
											name="breakfast"
											type="checkbox"
											className="h-4 w-4 rounded border-gray-300 text-blue-main focus:ring-blue-main"
										/>
									</div>
									<div className="text-sm leading-6">
										<label htmlFor="breakfast" className="font-medium text-gray-900">
											Breakfast
										</label>
										<p className="text-gray-500">Included breakfast.</p>
									</div>
								</div>
								<div className="relative flex gap-x-3">
									<div className="flex h-6 items-center">
										<input
											{...register("pets")}
											id="pets"
											name="pets"
											type="checkbox"
											className="h-4 w-4 rounded border-gray-300 text-blue-main focus:ring-blue-main"
										/>
									</div>
									<div className="text-sm leading-6">
										<label htmlFor="pets" className="font-medium text-gray-900">
											Pets
										</label>
										<p className="text-gray-500">Pets are welcome.</p>
									</div>
								</div>
							</div>
						</fieldset>
					</div>
				</div>
				{isError && (
					<p className="text-center text-md font-semibold text-red-600">
						Something went wrong, please check the data you entered and try again
					</p>
				)}
			</div>
			<div className="my-5 flex items-center justify-end gap-x-6">
				<button
					type="submit"
					className="mx-auto flex items-center justify-center rounded-md border border-transparent bg-blue-main px-8 py-3 text-base font-medium text-white outline-none hover:ring-2 hover:ring-blue-main ring-offset-1"
				>
					Add venue
				</button>
				<Link
					to={`/profiles/${userData.name}/venues`}
					className="mx-auto flex items-center justify-center rounded-md border border-transparent bg-red-main px-12 py-3 text-base font-medium text-gray-900 outline-none hover:ring-2 hover:ring-blue-main ring-offset-1"
				>
					Cancel
				</Link>
			</div>
		</form>
	);
}
