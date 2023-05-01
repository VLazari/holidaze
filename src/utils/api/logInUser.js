export default async function logInUser(data) {
	const options = {
		method: "POST",
		body: JSON.stringify({
			email: data.emailAddress,
			password: data.password,
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	};
	try {
		const response = await fetch("https://api.noroff.dev/api/v1/holidaze/auth/login", options);
		const json = await response.json();
		return json;
	} catch (error) {
		console.log(error);
	}
}
