export default async function registerUser(data) {
	const options = {
		method: "POST",
		body: JSON.stringify({
			name: data.userName,
			email: data.emailAddress,
			password: data.password,
			avatar: data.userAvatar,
			venueManager: data.venueManager,
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	};
	try {
		const response = await fetch("https://api.noroff.dev/api/v1/holidaze/auth/register", options);
		const json = await response.json();
		return json;
	} catch (error) {
		console.log(error);
	}
}
