import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { openLogIn, openRegister } from "../redux/modalStateSlice";
import LogIn from "./forms/LogIn";
import Register from "./forms/Register";
import { Menu, Transition } from "@headlessui/react";
import { UserCircleIcon, Bars3Icon } from "@heroicons/react/24/solid";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function DropMenu() {
	const dispatch = useDispatch();

	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-xl bg-red-main px-3 py-1 text-sm font-semibold shadow-sm ring-1 ring-inset ring-white focus:outline-none hover:ring-blue-main">
					<Bars3Icon className="h-6 w-6 text-white" />
					<UserCircleIcon className="h-8 w-8 text-white" />
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
					</div>
					{/* <div className="py-1">
						<Menu.Item>
							{({ active }) => (
								<a href="#" className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}>
									Archive
								</a>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<a href="#" className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}>
									Move
								</a>
							)}
						</Menu.Item>
					</div>
					<div className="py-1">
						<Menu.Item>
							{({ active }) => (
								<a href="#" className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}>
									Share
								</a>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<a href="#" className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}>
									Add to favorites
								</a>
							)}
						</Menu.Item>
					</div>
					<div className="py-1">
						<Menu.Item>
							{({ active }) => (
								<a href="#" className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}>
									Delete
								</a>
							)}
						</Menu.Item>
					</div> */}
				</Menu.Items>
			</Transition>
			<LogIn />
			<Register />
		</Menu>
	);
}
