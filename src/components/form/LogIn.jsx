import React, { Fragment, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideLogIn, openRegister } from "../../redux/modalStateSlice";
import { setLoggedUser } from "../../redux/loggedUserSlice";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import logInUser from "../../utils/api/logInUser";

const schema = yup
	.object({
		emailAddress: yup
			.string()
			.trim()
			.email("Invalid email format")
			.matches(/^[a-zA-Z0-9._%+-]+@(stud\.)?noroff\.no$/, "Please enter a valid stud.noroff.no or noroff.no email address.")
			.required("Please enter your email"),
		password: yup.string().trim().min(8, "Your password should be at least 8 characters.").required("Please enter your password"),
	})
	.required();

export default function LogIn() {
	const isOpenLogIn = useSelector((state) => state.modal.showLogInModal);
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
		const isLoggedIn = await logInUser(formData);
		dispatch(setLoggedUser(isLoggedIn));
		reset();
		dispatch(hideLogIn());
	}

	return (
		<Transition.Root show={isOpenLogIn} as={Fragment}>
			<Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => dispatch(hideLogIn())}>
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
													<div className="col-span-6">
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
															type="password"
															name="password"
															id="password"
															className="mt-2 block w-full rounded-md border-0 p-1.5 text-blue-main shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-gray-400 sm:text-sm sm:leading-6"
														/>
														<p className="text-sm text-red-main">{errors.password?.message}</p>
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
											Log in
										</button>
										<button
											type="button"
											className="mt-3 inline-flex w-full justify-center rounded-md bg-red-main px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-100 hover:ring-blue-main sm:mt-0 sm:w-auto"
											onClick={() => {
												reset();
												dispatch(openRegister());
												dispatch(hideLogIn());
											}}
											ref={cancelButtonRef}
										>
											Sign up
										</button>
										<button
											type="button"
											className="mt-3 mr-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-100 hover:ring-blue-main sm:mt-0 sm:w-auto"
											onClick={() => {
												reset();
												dispatch(hideLogIn());
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
