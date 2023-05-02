import { useState, useEffect } from "react";

export default function getVenues(url) {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(true);

	useEffect(() => {
		async function getData() {
			try {
				setError(false);
				setIsLoading(true);
				const response = await fetch(url);
				const json = await response.json();
				console.log("aici");
				setData(json);
			} catch (error) {
				console.log(error);
				setIsLoading(false);
				setError(true);
			} finally {
				setIsLoading(false);
			}
		}
		getData();
	}, [url]);
	return { data, isLoading, error };
}
