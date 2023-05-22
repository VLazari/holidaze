import { useState, useEffect } from "react";

export default function useSearch(data) {
	const [query, setQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	console.log("data", data);
	console.log("result", searchResults);

	useEffect(() => {
		if (data) {
			if (query.trim() === "") {
				setSearchResults(data);
			} else {
				const filteredResults = data.filter((venue) => venue.name.toLowerCase().includes(query.trim().toLowerCase()));
				setSearchResults(filteredResults);
			}
		}
	}, [query, data]);

	return { query, setQuery, searchResults };
}
