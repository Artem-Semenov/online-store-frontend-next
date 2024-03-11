/** @type {import('tailwindcss').Config} */

import twColors from "tailwindcss/colors";

const colors = {
	transparent: twColors.transparent,
	black: "#80838a",
	white: twColors.white,
	priamry: "#ff9900",
	secondary: "#161d25",
	"bg-color": "#f2f2f5",
	aqua: "#74afbb",
	red: twColors.red[400],
	// gray: "#CDCDCD",
};

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,tsx}"],
	theme: {
		extend: {
			colors,
			fontSize: {
				xs: "0.82rem",
				sm: "0.98rem",
				base: "1.15rem",
				lg: "1.22rem",
				xl: "1.36rem",
				"1.5xl": "1.5rem",
				"2xl": "1.725rem",
				"3xl": "2.155rem",
				"4xl": "2.58rem",
				"5xl": "3.45rem",
				"6xl": "4.3rem",
				"7xl": "5.17rem",
				"8xl": "6.9rem",
				"9xl": "9.2rem",
			},
			keyframes: {
				animationOpacity: {
					from: { opacity: 0.2 },
					to: { opacity: 1 },
				},
				scaleIn: {
					"0%": {
						opacity: 0,
						transform: "scale(0.9)",
					},
					"50%": {
						opacity: 0.3,
					},
					"100%": {
						opacity: 1,
						transform: "scale(1)",
					},
				},
			},
			animation: {
				opacity: "animationOpacity .5s ease in-out",
				scaleIn: "scaleIn .3s ease-in-out",
			},
		},
	},
	plugins: [],
};
