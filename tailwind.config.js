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
			screens: {
				"2xl": "1280px"
			}
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
			},
			keyframes: {
				zoomIn: {
					"0%": { transform: "scale(0.3)", opacity: "0.7" },
					"70%": { transform: "scale(1.05)" },
					"100%": { transform: "scale(1)", opacity: "1" }
				}
			},
			animation: {
				"zoom-in": "zoomIn 0.3s"
			}
		}
	},
	plugins: [require("tailwindcss-radix")()]
};
