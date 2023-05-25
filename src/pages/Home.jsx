import React, { useState } from "react";
import getVenues from "../hooks/apiGet";
import useSearch from "../hooks/useSearch";
import VenueCard from "../components/ui/VenueCard";
import Loader from "../components/ui/Loader";
import Pagination from "../components/ui/Pagination";
import SortSelectMenu from "../components/ui/SortSelectMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
	const [sortBy, setSortBy] = useState({ id: 1, name: "Date", sortValue: "created", sortOrder: "desc" });
	const { data, isLoading, error } = getVenues(
		`https://api.noroff.dev/api/v1/holidaze/venues?sort=${sortBy.sortValue}&sortOrder=${sortBy.sortOrder}`
	);
	const { query, setQuery, searchResults } = useSearch(data);
	const [pageResults, setPageResults] = useState([]);

	if (isLoading) {
		return <Loader />;
	}
	if (error) {
		return <div>Error: {error.message}</div>;
	}
	return (
		<div>
			<div className="flex items-center justify-center mt-6 -mb-6">
				<label htmlFor="search" className="sr-only">
					Search venue
				</label>
				<input
					type="text"
					id="search"
					name="search"
					value={query}
					onChange={(event) => setQuery(event.target.value.trim())}
					className="w-80 p-5 py-2 border-1 border-gray-900 rounded-lg"
					placeholder="Search venue by name, city or country"
				/>
				<FontAwesomeIcon className="mx-2 text-xl text-gray-900" icon={faMagnifyingGlass} />
			</div>
			<h1 className="sr-only">Holidaze - rent your dream home</h1>
			{searchResults.length < 1 && query && <div className="py-16 text-slate-900 text-center text-xl sm:text-3xl">No results</div>}
			{query && <VenueCard venues={searchResults} />}
			{!query && (
				<div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
					<SortSelectMenu selectedOption={sortBy} onChangeOption={setSortBy} />
					<VenueCard venues={pageResults} />
					<Pagination venues={data} setPageResults={setPageResults} />
				</div>
			)}
		</div>
	);
}
