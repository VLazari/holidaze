import React, { Fragment, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideRegister } from "../../redux/modalStateSlice";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import registerUser from "../../utils/api/registerUser";

const schema = yup
	.object({
		userName: yup
			.string()
			.trim()
			.matches(/^[\w_]+$/, "Name value must not contain punctuation symbols apart from underscore (_).")
			.required("Please enter your username"),
		emailAddress: yup
			.string()
			.trim()
			.email("Invalid email format")
			.matches(/^[a-zA-Z0-9._%+-]+@(stud\.)?noroff\.no$/, "Please enter a valid stud.noroff.no or noroff.no email address.")
			.required("Please enter your email"),
		password: yup.string().trim().min(8, "Your password should be at least 8 characters.").required("Please enter your password"),
		userAvatar: yup.string().trim().url("Should be a valid image URL."),
	})
	.required();

export default function Register() {
	const isOpenRegister = useSelector((state) => state.modal.showRegisterModal);
	const dispatch = useDispatch();
	const cancelButtonRef = useRef(null);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	async function onSubmit(formData) {
		await registerUser(formData);
		reset();
		dispatch(hideRegister());
	}

	return (
		<Transition.Root show={isOpenRegister} as={Fragment}>
			<Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => dispatch(hideRegister())}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
										<div className="overflow-hidden shadow sm:rounded-md">
											<div className="px-4 py-5 sm:p-6">
												<div className="grid grid-cols-6 gap-6">
													<div className="col-span-6 sm:col-span-3">
														<label htmlFor="firstName" className="block text-sm font-medium leading-6 text-blue-main">
															<span className="text-red-main">* </span>
															User name
														</label>
														<input
															{...register("userName")}
															type="text"
															name="userName"
															id="userName"
															autoComplete="given-name"
															className="mt-2 block w-full rounded-md border-0 p-1.5 text-blue-main shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-gray-400 sm:text-sm sm:leading-6"
														/>
														<p className="text-sm text-red-main">{errors.userName?.message}</p>
													</div>
													<div className="col-span-6 sm:col-span-4">
														<label htmlFor="emailAddress" className="block text-sm font-medium leading-6 text-blue-main">
															<span className="text-red-main">* </span>
															Email address
														</label>
														<input
															{...register("emailAddress")}
															type="text"
															name="emailAddress"
															id="emailAddress"
															autoComplete="email"
															className="mt-2 block w-full rounded-md border-0 p-1.5 text-blue-main shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-gray-400 sm:text-sm sm:leading-6"
														/>
														<p className="text-sm text-red-main">{errors.emailAddress?.message}</p>
													</div>

													<div className="col-span-6">
														<label htmlFor="password" className="block text-sm font-medium leading-6 text-blue-main">
															<span className="text-red-main">* </span>
															Password
														</label>
														<input
															{...register("password")}
															type="text"
															name="password"
															id="password"
															className="mt-2 block w-full rounded-md border-0 p-1.5 text-blue-main shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-gray-400 sm:text-sm sm:leading-6"
														/>
														<p className="text-sm text-red-main">{errors.password?.message}</p>
													</div>
													<div className="col-span-6">
														<label htmlFor="userAvatar" className="block text-sm font-medium leading-6 text-blue-main">
															Avatar URL
														</label>
														<input
															{...register("userAvatar")}
															type="text"
															name="userAvatar"
															id="userAvatar"
															className="mt-2 block w-full rounded-md border-0 p-1.5 text-blue-main shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-gray-400 sm:text-sm sm:leading-6"
														/>
														<p className="text-sm text-red-main">{errors.userAvatar?.message}</p>
													</div>
													<div className="col-span-6">
														<div className="flex gap-x-3">
															<div className="flex h-6 items-center">
																<input
																	{...register("venueManager")}
																	id="venueManager"
																	name="venueManager"
																	type="checkbox"
																	defaultChecked={true}
																	className="h-4 w-4 rounded border-gray-300"
																/>
															</div>
															<div className="text-sm">
																<label
																	htmlFor="venueManager"
																	className="text-sm font-medium leading-6 text-blue-main"
																>
																	Venue manager
																</label>
																<p className="text-gray-500">
																	Register as a venue manager to be able to rent a place in the future.
																</p>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="bg-blue-main px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
										<button
											type="submit"
											className="inline-flex w-full justify-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white shadow-sm hover:ring-blue-main sm:ml-3 sm:w-auto"
										>
											Sign up
										</button>
										<button
											type="button"
											className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-blue-main shadow-sm ring-1 ring-inset ring-gray-100 hover:ring-blue-main sm:mt-0 sm:w-auto"
											onClick={() => {
												reset();
												dispatch(hideRegister());
											}}
											ref={cancelButtonRef}
										>
											Cancel
										</button>
									</div>
								</form>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
