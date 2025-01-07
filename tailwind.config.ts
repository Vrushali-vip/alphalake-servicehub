import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate"

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				card: {
					DEFAULT: 'var(--card)',
					foreground: 'var(--card-foreground)'
				},
				popover: {
					DEFAULT: 'var(--popover)',
					foreground: 'var(--popover-foreground)'
				},
				primary: {
					DEFAULT: 'var(--primary)',
					foreground: 'var(--primary-foreground)'
				},
				secondary: {
					DEFAULT: 'var(--secondary)',
					foreground: 'var(--secondary-foreground)'
				},
				muted: {
					DEFAULT: 'var(--muted)',
					foreground: 'var(--muted-foreground)'
				},
				accent: {
					DEFAULT: 'var(--accent)',
					foreground: 'var(--accent-foreground)'
				},
				destructive: {
					DEFAULT: 'var(--destructive)',
					foreground: 'var(--destructive-foreground)'
				},
				bland: 'var(--bland)',
				border: 'var(--border)',
				input: 'var(--input)',
				ring: 'var(--ring)',
				chart: {
					'1': 'var(--chart-1)',
					'2': 'var(--chart-2)',
					'3': 'var(--chart-3)',
					'4': 'var(--chart-4)',
					'5': 'var(--chart-5)'
				},
				al: {
					'50': 'var(--al-50)',
					'100': 'var(--al-100)',
					'200': 'var(--al-200)',
					'300': 'var(--al-300)',
					'400': 'var(--al-400)',
					'500': 'var(--al-500)',
					'600': 'var(--al-600)',
					'700': 'var(--al-700)',
					'800': 'var(--al-800)',
					'900': 'var(--al-900)',
					'950': 'var(--al-950)',
					'1000': 'var(--al-1000)'
				}
			},
			fontFamily: {
				mont: ['var(--font-mont)'],
				robo: ['var(--font-robo)'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				zoom: {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.1)' },
				},
				typewriter: {
					'0%': { width: '0%' },
					'100%': { width: '100%' },
				},
				blink: {
					'0%, 50%': { 'border-color': 'transparent' },
					'100%': { 'border-color': 'black' },
				},
			},
			animation: {
				zoom: 'zoom 5s infinite',
				typewriter: 'typewriter 4s steps(40) 1s 1 normal both',
				blink: 'blink 1s steps(2) infinite',
			},
			
		}
	},
	plugins: [
		tailwindAnimate,
		function (api: { addUtilities: (utilities: Record<string, Record<string, string>>) => void; }) {
		  const { addUtilities } = api as {
			addUtilities: (utilities: Record<string, Record<string, string>>) => void;
		  };
		  addUtilities({
			".backface-hidden": {
			  "backface-visibility": "hidden",
			},
			".preserve-3d": {
			  "transform-style": "preserve-3d",
			},
			".perspective-1000": {
			  perspective: "1000px",
			},
		  });
		},
	  ],
};

export default config;
