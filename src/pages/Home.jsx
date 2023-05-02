import React from "react";
import getVenues from "../hooks/getVenues";
import VenueCard from "../components/ui/VenueCard";
import Loader from "../components/ui/Loader";

export default function Home() {
	const { data, isLoading, error } = getVenues("https://api.noroff.dev/api/v1/holidaze/venues");

	if (isLoading) {
		return <Loader />;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}
	return <VenueCard venues={data} />;
}
