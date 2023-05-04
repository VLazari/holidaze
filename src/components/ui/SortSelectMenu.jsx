import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const sortOptions = [
	{
		id: 1,
		name: "Date",
		sortValue: "created",
	},
	{
		id: 2,
		name: "Venue name",
		sortValue: "name",
	},
	{
		id: 3,
		name: "Price",
		sortValue: "price",
	},
	{
		id: 4,
		name: "Number of guests",
		sortValue: "maxGuests",
	},
	{
		id: 5,
		name: "Rating",
		sortValue: "rating",
	},
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function SortSelectMenu({ selectedOption, onChangeOption }) {
	return (
		<Listbox value={selectedOption} onChange={onChangeOption}>
			{({ open }) => (
				<div className="flex items-center mx-3 mt-3">
					<Listbox.Label className="mr-2 text-md font-bold text-gray-900">Sort by: </Listbox.Label>
					<div className="relative">
						<Listbox.Button className="relative w-44 cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-2 ring-inset ring-blue-main focus:outline-none focus:ring-2 focus:ring-blue-main sm:text-sm">
							<span className="ml-3 block truncate">{selectedOption.name}</span>
							<span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
								<ChevronUpDownIcon className="h-5 w-5 text-blue-main" aria-hidden="true" />
							</span>
						</Listbox.Button>

						<Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
							<Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
								{sortOptions.map((option) => (
									<Listbox.Option
										key={option.id}
										className={({ active }) =>
											classNames(
												active ? "bg-blue-main text-white" : "text-gray-900",
												"relative cursor-default select-none py-2 pl-3 pr-9"
											)
										}
										value={option}
									>
										{({ selected, active }) => (
											<>
												<div className={classNames(selected ? "font-semibold" : "font-normal", "ml-3 block truncate")}>
													{option.name}
												</div>
												{selected ? (
													<span
														className={classNames(
															active ? "text-white" : "text-indigo-600",
															"absolute inset-y-0 right-0 flex items-center pr-4"
														)}
													>
														<CheckIcon className="h-5 w-5" aria-hidden="true" />
													</span>
												) : null}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</div>
			)}
		</Listbox>
	);
}
