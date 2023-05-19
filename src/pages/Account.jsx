import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateLoggedUser } from "../redux/loggedUserSlice";
import apiAuthGet from "../hooks/apiAuthGet";
import apiPutData from "../utils/api/apiPutData";
import Loader from "../components/ui/Loader";
import BookingCard from "../components/ui/BookingCard";
import { UserCircleIcon } from "@heroicons/react/24/solid";

export default function Account() {
	const userData = useSelector((state) => state.isLoggedIn.userData);
	const dispatch = useDispatch();
	const [urlError, setUrlError] = useState(false);
	const [newAvatarUrl, setNewAvatarUrl] = useState("");
	const { data, isLoading, error } = apiAuthGet(`https://api.noroff.dev/api/v1/holidaze/profiles/${userData.name}?_bookings=true`);

	async function updateUser() {
		let newData = { ...userData };
		const response = await apiPutData(`https://api.noroff.dev/api/v1/holidaze/profiles/${userData.name}/media`, { avatar: newAvatarUrl });
		if (response.name) {
			newData.avatar = newAvatarUrl;
			dispatch(updateLoggedUser(newData));
			setUrlError(false);
		} else setUrlError(true);
	}

	if (isLoading) {
		return <Loader />;
	}
	if (error) {
		return <div className="mx-auto mt-10 text-red-main text-lg font-bold">Sorry, something went wrong. {error.message}</div>;
	}
	return (
		<div className="bg-white">
			<div className="pt-6">
				{/* <nav aria-label="Breadcrumb">
					<ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
						{product.breadcrumbs.map((breadcrumb) => (
							<li key={breadcrumb.id}>
								<div className="flex items-center">
									<a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
										{breadcrumb.name}
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
						))}
						<li className="text-sm">
							<a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
								{product.name}
							</a>
						</li>
					</ol>
				</nav> */}

				{/* Product info */}
				<div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
					<div className="lg:col-span-2 lg:border-r lg:border-red-main lg:pr-8">
						<h1 className="text-2xl font-bold text-blue-main sm:text-3xl">
							{data.name} - {data.email}
						</h1>
					</div>

					{/* Options */}
					<div className="mt-4 lg:row-span-3 lg:mt-0">
						<h2 className="sr-only">Profile image</h2>
						{/* <div className="flex"> */}
						{userData.avatar ? (
							<div className={`mx-auto h-44 w-44 border rounded-full border-blue-main`}>
								<img src={userData.avatar} alt="Avatar image" className="h-full w-full object-cover object-center rounded-full" />
							</div>
						) : (
							<UserCircleIcon className="mx-auto h-44 w-44 text-blue-main" />
						)}
						{/* </div> */}

						<div className="mt-10 p-3 border">
							<p className={`text-red-main ${urlError ? "flex" : "hidden"}`}>Please check if you provide a valid URL</p>
							<div className="col-span-6">
								<input
									type="text"
									placeholder="Enter new image URL"
									name="userAvatar"
									id="userAvatar"
									className="mt-2 block w-full border-0 border-b-2 p-1.5 focus:ring-0 select-none text-blue-main shadow-sm sm:text-sm sm:leading-6"
									onChange={(e) => {
										setNewAvatarUrl(e.target.value);
										setUrlError(false);
									}}
								/>
							</div>
							<button
								type="button"
								className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-red-main px-8 py-3 text-base font-medium text-blue-main outline-none hover:ring-2 hover:ring-blue-main ring-offset-1"
								onClick={() => updateUser()}
							>
								Change avatar
							</button>
						</div>
					</div>

					<div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-red-main lg:pb-16 lg:pr-8 lg:pt-6">
						<BookingCard bookings={data.bookings} />
						{/* <div className="mt-10">
							<h3 className="text-sm font-medium text-gray-900">Highlights</h3>

							<div className="mt-4">
								<ul role="list" className="list-disc space-y-2 pl-4 text-sm">
									{product.highlights.map((highlight) => (
										<li key={highlight} className="text-gray-400">
											<span className="text-gray-600">{highlight}</span>
										</li>
									))}
								</ul>
							</div>
						</div>

						<div className="mt-10">
							<h2 className="text-sm font-medium text-gray-900">Details</h2>

							<div className="mt-4 space-y-6">
								<p className="text-sm text-gray-600">{product.details}</p>
							</div>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
}
