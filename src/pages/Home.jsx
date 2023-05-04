import React, { useState } from "react";
import getVenues from "../hooks/getVenues";
import VenueCard from "../components/ui/VenueCard";
import Loader from "../components/ui/Loader";
import SortSelectMenu from "../components/ui/SortSelectMenu";
import { useSearchParams } from "react-router-dom";

export default function Home() {
	const [sortBy, setSortBy] = useState({ id: 1, name: "Date", sortValue: "created" });
	const { data, isLoading, error } = getVenues(`https://api.noroff.dev/api/v1/holidaze/venues?sort=${sortBy.sortValue}&sortOrder=asc`);

	if (isLoading) {
		return <Loader />;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}
	return (
		<>
			<SortSelectMenu selectedOption={sortBy} onChangeOption={setSortBy} />
			<VenueCard venues={data} />;
		</>
	);
}
