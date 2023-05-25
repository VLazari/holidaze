const filterOptions = [
	{
		id: 1,
		name: "Date",
		sortValue: "created",
		sortOrder: "desc",
	},
	{
		id: 2,
		name: "Price (low-high)",
		sortValue: "price",
		sortOrder: "asc",
	},
	{
		id: 3,
		name: "Price (high-low)",
		sortValue: "price",
		sortOrder: "desc",
	},
	{
		id: 4,
		name: "Guests (low-high)",
		sortValue: "maxGuests",
		sortOrder: "asc",
	},
	{
		id: 5,
		name: "Guests (high-low)",
		sortValue: "maxGuests",
		sortOrder: "desc",
	},
];

export default filterOptions;
