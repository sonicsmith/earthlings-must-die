import { type Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#14b8a6',
      },
    },
  },
  plugins: [],
} satisfies Config;
