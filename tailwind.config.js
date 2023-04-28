/** @type {import('tailwindcss').Config} */
export default {
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
					new: "#ffbf41",
				},
			},
		},
	},
	plugins: [],
};
