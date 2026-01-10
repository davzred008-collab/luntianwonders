import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        luntian: {
          50: '#f2fcf5',
          100: '#e1f8e8',
          500: '#22c55e', // Primary Green
          700: '#15803d', // Darker Green (Text/Borders)
          900: '#14532d', // Deep Forest
        },
        stone: {
          50: '#fafaf9',
          900: '#1c1917', // Primary Text
        }
      },
    },
  },
  plugins: [],
};
export default config;