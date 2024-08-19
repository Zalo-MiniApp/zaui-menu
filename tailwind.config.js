/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ng: {
          10: 'rgb(var(--color-ng-10) / <alpha-value>)',
        },
        background: {
          DEFAULT: 'var(--color-background)',
        },
        primary: {
          DEFAULT: 'rgb(var(--color-primary-rgb) / <alpha-value>)',
          pressed: 'var(--color-primary-pressed)',
          foreground: 'var(--color-primary-foreground)',
        },
        inactive: {
          DEFAULT: 'var(--color-inactive)',
          foreground: 'var(--color-inactive-foreground)',
        },
        text: {
          DEFAULT: 'var(--color-text)',
          secondary: 'var(--color-text-secondary)',
          subtle: 'var(--color-text-subtle)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
        },
        divider: {
          DEFAULT: 'var(--color-divider)',
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out',
        'add-to-cart': 'add-to-cart 0.5s ease-in-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'add-to-cart': {
          '0%': { transform: 'scale(1)' },
          '20%': { transform: 'scale(0.95)' },
          '50%': { transform: 'scale(1.1)' },
          '80%': { transform: 'scale(1.05)' },
          '90%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  corePlugins: {
    preflight: false,
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
