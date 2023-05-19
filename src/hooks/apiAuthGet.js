import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function apiAuthGet(url) {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(true);
	const { accessToken } = useSelector((state) => state.isLoggedIn.userData);

	useEffect(() => {
		async function getData() {
			try {
				setError(false);
				setIsLoading(true);
				const response = await fetch(url, {
					headers: {
						"Content-type": "application/json; charset=UTF-8",
						Authorization: `Bearer ${accessToken}`,
					},
				});
				const json = await response.json();
				setData(json);
			} catch (error) {
				setIsLoading(false);
				setError(true);
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		}
		getData();
	}, [url]);
	return { data, isLoading, error };
}
