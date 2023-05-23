import React, { useState } from "react";
import getVenues from "../hooks/apiGet";
import useSearch from "../hooks/useSearch";
import VenueCard from "../components/ui/VenueCard";
import Loader from "../components/ui/Loader";
import SortSelectMenu from "../components/ui/SortSelectMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
	const [sortBy, setSortBy] = useState({ id: 1, name: "Date", sortValue: "created", sortOrder: "desc" });
	const { data, isLoading, error } = getVenues(
		`https://api.noroff.dev/api/v1/holidaze/venues?sort=${sortBy.sortValue}&sortOrder=${sortBy.sortOrder}`
	);
	const { query, setQuery, searchResults } = useSearch(data);
	if (isLoading) {
		return <Loader />;
	}
	if (error) {
		return <div>Error: {error.message}</div>;
	}
	return (
		<div>
			<div className="mx-auto p-2 max-w-7xl flex flex-col-reverse md:flex-row justify-start md:justify-between items-start md:items-center w-full  bg-blue-main rounded-b-2xl">
				<SortSelectMenu selectedOption={sortBy} onChangeOption={setSortBy} />
				<div className="flex items-center rounded-full px-2 pb-3">
					<label htmlFor="search" className="sr-only">
						Search venue
					</label>
					<input
						type="text"
						id="search"
						name="search"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						className="w-80 p-5 py-2 border rounded-full"
						placeholder="Search venue..."
					/>
					<FontAwesomeIcon className="mx-2 text-xl text-white" icon={faMagnifyingGlass} />
				</div>
			</div>
			<h1 className="sr-only">Holidaze - rent your dream home</h1>
			{searchResults.length < 1 && <div className="py-16 text-slate-900 text-center text-xl sm:text-3xl">No results</div>}
			<VenueCard venues={searchResults} />
		</div>
	);
}
