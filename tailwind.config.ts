import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '480px',
        '3xl': '1920px',
      },
      colors: {
        brand: {
          DEFAULT: '#4f46e5',
          dark: '#3730a3',
          light: '#818cf8',
        },
        accent: '#f59e0b',
      },
      borderRadius: {
        xl: '20px',
      },
    },
  },
};

export default config;
