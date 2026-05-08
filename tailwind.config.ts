import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#1a1a1a',
          50: '#f6f6f6',
          900: '#1a1a1a',
        },
        coast: {
          DEFAULT: '#2a4d6e',
          900: '#1a3a5c',
        },
        sand: {
          DEFAULT: '#f4ede0',
        },
        sunset: {
          DEFAULT: '#e87d3e',
          900: '#c66422',
        },
        'premium-charcoal': {
          DEFAULT: '#1a1a2e',
          900: '#0a1020',
        },
        'premium-gold': {
          DEFAULT: '#f4a620',
          900: '#c98714',
        },
      },
      fontFamily: {
        display: ['Habibi', 'Playfair Display', 'Cormorant Garamond', 'serif'],
        sans: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '70ch',
      },
    },
  },
  plugins: [],
};

export default config;
