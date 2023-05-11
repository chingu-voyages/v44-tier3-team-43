/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");
const { colors } = require("tailwindcss/colors");

module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		container: {
			center: true,
			padding: "1.25rem",
		},
		extend: {
			fontFamily: {
				sans: ["var(--font-inter)", ...fontFamily.sans]
			},
			colors: {
				...colors,
				"custom-black": "#182326",
				"custom-white": "#E7E7E7",
				"dark-grey": "#273032",
				"light-grey": "#A8A8A8",
				"custom-red": "#920D0D",
				"custom-green": "#177807",
				"custom-blue": "#12506B",
				"custom-orange": "#BC5D19"
			}
		}
	},
	plugins: []
};
