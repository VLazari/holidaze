import { getItem } from "../useLocalStorage";
/**
 * Execute a post request to the specified URL and body.
 * @param {string} url API URL to be fetched
 * @param {object} bodyData The data body to be send in a form of an object
 * @returns The data response after fetching
 */

export default async function apiPostData(url, bodyData) {
	const token = getItem("user").accessToken;
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(bodyData),
		});
		const json = await response.json();
		return json;
	} catch (error) {
		console.log(error);
		return error;
	}
}
