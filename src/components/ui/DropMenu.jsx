import { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openLogIn, openRegister } from "../../redux/modalStateSlice";
import { removeLoggedUser } from "../../redux/loggedUserSlice";
import LogIn from "../form/LogIn";
import Register from "../form/Register";
import { Menu, Transition } from "@headlessui/react";
import { UserCircleIcon, Bars3Icon } from "@heroicons/react/24/solid";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function DropMenu() {
	const isLogIn = useSelector((state) => state.isLoggedIn.isLogIn);
	const userData = useSelector((state) => state.isLoggedIn.userData);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		!isLogIn && navigate("/");
	}, [isLogIn]);

	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-xl bg-slate-800 px-3 py-1 text-sm font-semibold shadow-sm ring-1 ring-inset ring-white focus:outline-none hover:ring-2">
					{userData.name ? <p className="text-white">{userData.name}</p> : <Bars3Icon className="h-6 w-6 text-white" />}
					{userData.avatar ? (
						<div className={`h-8 w-8 border rounded-full border-white`}>
							<img src={userData.avatar} alt="User's avatar image" className="h-full w-full object-cover object-center rounded-full" />
						</div>
					) : (
						<div>
							<p className="sr-only">Log in / Register</p>
							<UserCircleIcon className="h-8 w-8 text-white" />
						</div>
					)}
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="py-1 cursor-pointer">
						{!isLogIn ? (
							<Fragment>
								<Menu.Item className="m-1">
									{({ active }) => (
										<div
											onClick={() => dispatch(openLogIn())}
											className={classNames(
												active ? "bg-blue-main text-white rounded-lg" : "text-gray-700",
												"block px-4 py-2 text-sm"
											)}
										>
											Log in
										</div>
									)}
								</Menu.Item>
								<Menu.Item className="m-1">
									{({ active }) => (
										<div
											onClick={() => dispatch(openRegister())}
											className={classNames(
												active ? "bg-blue-main text-white rounded-lg" : "text-gray-700",
												"block px-4 py-2 text-sm"
											)}
										>
											Sign up
										</div>
									)}
								</Menu.Item>
							</Fragment>
						) : (
							<Fragment>
								<Menu.Item className="m-1">
									{({ active }) => (
										<Link
											to={`/profile/${userData.name}`}
											className={classNames(
												active ? "bg-blue-main text-white rounded-lg" : "text-gray-700",
												"block px-4 py-2 text-sm"
											)}
										>
											Account
										</Link>
									)}
								</Menu.Item>
								<hr />
								{userData.venueManager && (
									<>
										<Menu.Item className="m-1">
											{({ active }) => (
												<Link
													to={`/profiles/${userData.name}/venues`}
													className={classNames(
														active ? "bg-blue-main text-white rounded-lg" : "text-gray-700",
														"block px-4 py-2 text-sm"
													)}
												>
													Venues
												</Link>
											)}
										</Menu.Item>
										<Menu.Item className="m-1">
											{({ active }) => (
												<Link
													to={`/venue/add`}
													className={classNames(
														active ? "bg-blue-main text-white rounded-lg" : "text-gray-700",
														"block px-4 py-2 text-sm"
													)}
												>
													Add venue
												</Link>
											)}
										</Menu.Item>
										<hr />
									</>
								)}
								<Menu.Item className="m-1">
									{({ active }) => (
										<div
											onClick={() => dispatch(removeLoggedUser())}
											className={classNames(
												active ? "bg-blue-main text-white rounded-lg" : "text-gray-700",
												"block px-4 py-2 text-sm"
											)}
										>
											Log out
										</div>
									)}
								</Menu.Item>
							</Fragment>
						)}
					</div>
				</Menu.Items>
			</Transition>
			<LogIn />
			<Register />
		</Menu>
	);
}
