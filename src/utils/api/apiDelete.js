import { getItem } from "../useLocalStorage";
/**
 * Execute a DELETE request to the specified URL.
 * @param {string} url API URL to to fetch the DELETE method
 * @returns The data response after fetching
 */

export default async function apiDelete(url) {
	const token = getItem("user").accessToken;
	try {
		const response = await fetch(url, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				Authorization: `Bearer ${token}`,
			},
		});
		return response.status;
	} catch (error) {
		console.log(error);
		return error;
	}
}
