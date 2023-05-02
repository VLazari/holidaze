import { Fragment } from "react";
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

	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-xl bg-red-main px-3 py-1 text-sm font-semibold shadow-sm ring-1 ring-inset ring-white focus:outline-none hover:ring-blue-main">
					{userData.name ? <p className="text-blue-main">{userData.name}</p> : <Bars3Icon className="h-6 w-6 text-white" />}
					{userData.avatar ? (
						<div
							className={`h-8 w-8 border rounded-full border-white bg-[url("${userData.avatar}")] bg-no-repeat bg-center bg-cover`}
						></div>
					) : (
						<UserCircleIcon className="h-8 w-8 text-white" />
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
								<Menu.Item>
									{({ active }) => (
										<div
											onClick={() => dispatch(openLogIn())}
											className={classNames(active ? "bg-blue-main text-red-main" : "text-gray-700", "block px-4 py-2 text-sm")}
										>
											Log in
										</div>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<div
											onClick={() => dispatch(openRegister())}
											className={classNames(active ? "bg-blue-main text-red-main" : "text-gray-700", "block px-4 py-2 text-sm")}
										>
											Sign up
										</div>
									)}
								</Menu.Item>
							</Fragment>
						) : (
							<Menu.Item>
								{({ active }) => (
									<div
										onClick={() => dispatch(removeLoggedUser())}
										className={classNames(active ? "bg-blue-main text-red-main" : "text-gray-700", "block px-4 py-2 text-sm")}
									>
										Log out
									</div>
								)}
							</Menu.Item>
						)}
					</div>
				</Menu.Items>
			</Transition>
			<LogIn />
			<Register />
		</Menu>
	);
}
