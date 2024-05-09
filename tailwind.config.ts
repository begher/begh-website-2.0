import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './helpers/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './types/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'begh-background': '#F2F5FD',
        'begh-white': '#FEFDFF',
        'begh-gray': '#414141',
        'begh-blueGray': '#17242B',
      },
      boxShadow: {
        'begh-body': '0 0 50px rgba(0, 0, 0, 0.25)',
        'begh-modals': '0 0 25px rgba(0, 0, 0, 0.2)',
        'begh-success': '0 0 10px rgba(32, 232, 0, 0.2)',
        'begh-success-hover': '0 0 10px 4px rgba(32, 232, 0, 0.25)',
        'begh-error': '0 0 10px rgba(232, 0, 0, 0.5)',
        'begh-error-hover': '0 0 10px 4px rgba(232, 0, 0, 0.5)',
        'begh-notification': '0 0 10px 4px rgba(121, 151, 228, 0.3)',
      },
      fontFamily: {
        benee: ['var(--font-benne)', 'sans-serif'],
        bungee: ['var(--font-bungee)', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      screens: {
        xs: '460px',
      },
    },
  },
  plugins: [],
};
export default config;
