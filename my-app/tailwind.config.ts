import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'manrope': ['var(--font-manrope)', 'sans-serif'],
        'roboto': ['var(--font-roboto)', 'sans-serif'],
        'inter': ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        'brand-blue': '#3549cb',
        'text-secondary': '#858a99',
      },
      fontWeight: {
        'extralight': '200',
      },
    },
  },
  plugins: [],
};

export default config;
