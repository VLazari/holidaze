/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				red: {
					main: "#ff6764",
				},
				blue: {
					main: "#2f455f",
				},
				gold: {
					main: "#ffbf41",
				},
			},
			gridTemplateRows: {
				"[auto,auto,1fr]": "auto auto 1fr",
			},
		},
	},
	plugins: [require("@tailwindcss/forms"), require("@tailwindcss/aspect-ratio")],
};
