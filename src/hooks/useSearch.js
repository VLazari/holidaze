import { useState, useEffect } from "react";

export default function useSearch(data) {
	const [query, setQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		if (data) {
			if (query.trim() === "") {
				setSearchResults(data);
			} else {
				const filteredResults = data.filter((venue) => {
					const nameMatch = venue.name.toLowerCase().includes(query.trim().toLowerCase());
					const cityMatch = venue.location.city.toLowerCase().includes(query.trim().toLowerCase());
					const countryMatch = venue.location.country.toLowerCase().includes(query.trim().toLowerCase());
					// Return true if any of the properties match the query
					return nameMatch || cityMatch || countryMatch;
				});

				setSearchResults(filteredResults);
			}
		}
	}, [query, data]);

	return { query, setQuery, searchResults };
}
