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
		},
	},
	plugins: [require("@tailwindcss/aspect-ratio")],
};
