
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Extended modern color palette with more vibrant colors
				modern: {
					blue: {
						50: 'hsl(214 100% 97%)',
						100: 'hsl(214 95% 93%)',
						200: 'hsl(213 97% 87%)',
						300: 'hsl(212 96% 78%)',
						400: 'hsl(213 94% 68%)',
						500: 'hsl(217 91% 60%)',
						600: 'hsl(221 83% 53%)',
						700: 'hsl(224 76% 48%)',
						800: 'hsl(226 71% 40%)',
						900: 'hsl(224 64% 33%)',
					},
					slate: {
						50: 'hsl(210 40% 98%)',
						100: 'hsl(210 40% 96%)',
						200: 'hsl(214 32% 91%)',
						300: 'hsl(213 27% 84%)',
						400: 'hsl(215 20% 65%)',
						500: 'hsl(215 16% 47%)',
						600: 'hsl(215 19% 35%)',
						700: 'hsl(215 25% 27%)',
						800: 'hsl(217 33% 17%)',
						900: 'hsl(222 84% 5%)',
					},
					emerald: {
						50: 'hsl(151 81% 96%)',
						100: 'hsl(149 80% 90%)',
						200: 'hsl(152 76% 80%)',
						300: 'hsl(156 72% 67%)',
						400: 'hsl(158 64% 52%)',
						500: 'hsl(160 84% 39%)',
						600: 'hsl(161 94% 30%)',
						700: 'hsl(163 94% 24%)',
						800: 'hsl(163 88% 20%)',
						900: 'hsl(164 86% 16%)',
					},
					purple: {
						50: 'hsl(270 100% 98%)',
						100: 'hsl(269 100% 95%)',
						200: 'hsl(269 100% 92%)',
						300: 'hsl(269 97% 85%)',
						400: 'hsl(270 95% 75%)',
						500: 'hsl(271 91% 65%)',
						600: 'hsl(271 81% 56%)',
						700: 'hsl(272 72% 47%)',
						800: 'hsl(272 67% 39%)',
						900: 'hsl(273 66% 32%)',
					},
					rose: {
						50: 'hsl(355 100% 97%)',
						100: 'hsl(355 100% 95%)',
						200: 'hsl(353 96% 90%)',
						300: 'hsl(353 95% 81%)',
						400: 'hsl(351 95% 71%)',
						500: 'hsl(350 89% 60%)',
						600: 'hsl(347 77% 50%)',
						700: 'hsl(345 83% 41%)',
						800: 'hsl(343 80% 35%)',
						900: 'hsl(342 75% 30%)',
					},
					orange: {
						50: 'hsl(33 100% 96%)',
						100: 'hsl(34 100% 92%)',
						200: 'hsl(32 98% 83%)',
						300: 'hsl(31 97% 72%)',
						400: 'hsl(27 96% 61%)',
						500: 'hsl(25 95% 53%)',
						600: 'hsl(21 90% 48%)',
						700: 'hsl(17 88% 40%)',
						800: 'hsl(15 79% 34%)',
						900: 'hsl(15 75% 28%)',
					},
					teal: {
						50: 'hsl(166 76% 97%)',
						100: 'hsl(167 85% 89%)',
						200: 'hsl(168 84% 78%)',
						300: 'hsl(171 77% 64%)',
						400: 'hsl(172 66% 50%)',
						500: 'hsl(173 80% 40%)',
						600: 'hsl(175 84% 32%)',
						700: 'hsl(175 77% 26%)',
						800: 'hsl(176 69% 22%)',
						900: 'hsl(176 61% 19%)',
					},
					amber: {
						50: 'hsl(48 100% 96%)',
						100: 'hsl(48 96% 89%)',
						200: 'hsl(48 97% 77%)',
						300: 'hsl(46 97% 65%)',
						400: 'hsl(43 96% 56%)',
						500: 'hsl(38 92% 50%)',
						600: 'hsl(32 95% 44%)',
						700: 'hsl(26 90% 37%)',
						800: 'hsl(23 83% 31%)',
						900: 'hsl(22 78% 26%)',
					},
					indigo: {
						50: 'hsl(226 100% 97%)',
						100: 'hsl(226 100% 94%)',
						200: 'hsl(228 96% 89%)',
						300: 'hsl(230 94% 82%)',
						400: 'hsl(234 89% 74%)',
						500: 'hsl(239 84% 67%)',
						600: 'hsl(243 75% 59%)',
						700: 'hsl(245 58% 51%)',
						800: 'hsl(244 55% 41%)',
						900: 'hsl(242 47% 34%)',
					},
					pink: {
						50: 'hsl(327 73% 97%)',
						100: 'hsl(326 78% 95%)',
						200: 'hsl(326 85% 90%)',
						300: 'hsl(327 87% 82%)',
						400: 'hsl(329 86% 70%)',
						500: 'hsl(330 81% 60%)',
						600: 'hsl(333 71% 51%)',
						700: 'hsl(335 78% 42%)',
						800: 'hsl(336 74% 35%)',
						900: 'hsl(336 69% 30%)',
					}
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-secondary': 'var(--gradient-secondary)',
				'gradient-accent': 'var(--gradient-accent)',
				'gradient-success': 'var(--gradient-success)',
				'gradient-warning': 'var(--gradient-warning)',
				'gradient-info': 'var(--gradient-info)',
				'gradient-emerald': 'var(--gradient-emerald)',
				'gradient-purple': 'var(--gradient-purple)',
				'gradient-rose': 'var(--gradient-rose)',
				'gradient-teal': 'var(--gradient-teal)',
				'gradient-amber': 'var(--gradient-amber)',
				'gradient-indigo': 'var(--gradient-indigo)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
