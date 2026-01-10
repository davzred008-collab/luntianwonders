import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // <--- Ensures it scans all src subfolders
  ],
  theme: {
    extend: {
      colors: {
        luntian: {
          50: '#f2fcf5',
          100: '#e1f8e8',
          500: '#22c55e', // Primary Green
          600: '#16a34a', // Hover Green
          700: '#15803d', // Darker Green (Text/Borders)
          800: '#166534',
          900: '#14532d', // Deep Forest
        },
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        }
      },
    },
  },
  plugins: [],
};
export default config;