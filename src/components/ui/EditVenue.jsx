import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import apiPutData from "../../utils/api/apiPutData";

const schema = yup
	.object({
		name: yup.string().trim(),
		description: yup.string().trim(),
		venueImage: yup.array().of(yup.string().trim().url("Should be a valid image URL.")),
		price: yup.mixed().test("price", "The price must be a number greater than 1", (val) => val === "" || yup.number().min(1).isValidSync(val)),
		maxGuests: yup
			.mixed()
			.test(
				"maxGuests",
				"The price must be a number greater than 1",
				(val) => val === "" || yup.number().min(1, "Minimum 1 guest").max(15, "Maximum 15 guests").isValidSync(val)
			),
		wifi: yup.boolean(),
		parking: yup.boolean(),
		breakfast: yup.boolean(),
		pets: yup.boolean(),
	})
	.required();

export default function EditVenue({ setReloadApi, venue }) {
	const [nrOfImages, setNrOfImages] = useState(1);
	const [isError, setIsError] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		const { name, description, price, maxGuests, venueImage, wifi, parking, breakfast, pets } = data;
		const media = venueImage.filter((image) => image !== "");
		const option = {
			...(name && { name }),
			...(description && { description }),
			...(price && { price: parseInt(price) }),
			...(maxGuests && { maxGuests: parseInt(maxGuests) }),
			...(media.length > 0 ? { media } : { media: venue.media }),
			meta: {
				...{ wifi },
				...{ parking },
				...{ breakfast },
				...{ pets },
			},
		};
		const response = await apiPutData(`https://api.noroff.dev/api/v1/holidaze/venues/${venue.id}`, option);
		response && response.id ? setReloadApi((reload) => reload + 1) : setIsError(true);
	};

	return (
		<form className="p-2 md:p-5" onSubmit={handleSubmit(onSubmit)}>
			<div className="space-y-12 p-5">
				<div className="border-b border-gray-900/10 pb-12">
					<h1 className="text-center text-base font-bold leading-7 text-blue-main">Edit venue</h1>
					<p className="mt-5 text-sm leading-6 text-gray-600">Complete the fields to edit.</p>
					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-4">
							<label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
								Venue name
							</label>
							<div className="mt-2">
								<div className="flex rounded-md shadow-sm p-1.5 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-main sm:max-w-md">
									<input
										{...register("name")}
										type="text"
										name="name"
										id="name"
										autoComplete="name"
										placeholder="Venue name"
										className="block flex-1 border-0 bg-transparent p-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
									/>
								</div>
								<p className="text-sm text-red-main">{errors.name?.message}</p>
							</div>
						</div>
						<div className="col-span-full">
							<label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
								Description
							</label>
							<div className="mt-2">
								<textarea
									{...register("description")}
									id="description"
									name="description"
									placeholder="Short description of the venue"
									rows={3}
									className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-main sm:text-sm sm:leading-6"
								/>
							</div>
							<p className="text-sm text-red-main">{errors.description?.message}</p>
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
										className="block flex-1 border-0 bg-transparent p-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
									/>
								</div>
								<p className="text-sm text-red-main">{errors.venueImage?.[index]?.message}</p>
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
					<p className="mt-1 text-sm leading-6 text-gray-600">Edit price or maximum number of guests.</p>
					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-3">
							<label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
								Price / night
							</label>
							<div className="mt-2">
								<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-main sm:max-w-md">
									<span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$ </span>
									<input
										{...register("price")}
										type="number"
										name="price"
										id="price"
										className="block flex-1 border-0 bg-transparent p-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
									/>
								</div>
								<p className="text-sm text-red-main">{errors.price?.message}</p>
							</div>
						</div>
						<div className="sm:col-span-3">
							<label htmlFor="maxGuests" className="block text-sm font-medium leading-6 text-gray-900">
								Maximum number of guests
							</label>
							<div className="mt-2">
								<input
									{...register("maxGuests")}
									id="maxGuests"
									name="maxGuests"
									autoComplete="maxGuests"
									className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-main sm:max-w-xs sm:text-sm sm:leading-6"
								/>
							</div>
							<p className="text-sm text-red-main">{errors.maxGuests?.message}</p>
						</div>
					</div>
				</div>
				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">Features</h2>
					<p className="mt-1 text-sm leading-6 text-red-main">Make sure to include all existing feature on edit.</p>
					<div className="mt-6 space-y-10">
						<fieldset>
							<div className="space-y-6">
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
					<p className="text-center text-md font-semibold text-red-main">
						Something went wrong, please check the data you entered and try again
					</p>
				)}
			</div>
			<div className="my-5 flex items-center justify-end gap-x-6">
				<button
					type="submit"
					className="mx-auto flex w-full md:w-8/12 items-center justify-center rounded-md border border-transparent bg-red-main px-8 py-3 text-base font-medium text-blue-main outline-none hover:ring-2 hover:ring-blue-main ring-offset-1" // className="rounded-md bg-red-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:ring-2 hover:ring-red-main ring-offset-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-main"
				>
					Edit venue
				</button>
			</div>
		</form>
	);
}
