import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

/**
 * Custom hock that execute an authorized fetch api using GET method.
 * @param {string} url the url to fetch. Use false url to skip execution.
 * @param {number} reload optional, random variable that can be changed for re-executing the hock.
 * @returns fetch response on success and error on fail.
 */

export default function apiAuthGet(url, reload) {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(true);
	const { accessToken } = useSelector((state) => state.isLoggedIn.userData);

	useEffect(() => {
		async function fetchData() {
			try {
				setError(false);
				setIsLoading(true);
				if (url) {
					const response = await fetch(url, {
						headers: {
							"Content-type": "application/json; charset=UTF-8",
							Authorization: `Bearer ${accessToken}`,
						},
					});
					const json = await response.json();
					setData(json);
				}
			} catch (error) {
				setIsLoading(false);
				setError(true);
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		}
		fetchData();
	}, [url, reload]);
	return { data, isLoading, error };
}
