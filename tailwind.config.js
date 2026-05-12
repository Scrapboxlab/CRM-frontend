/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ─── Scrapbox Brand Palette ───────────────────────────────────────
        // Dark Navy scale — used for sidebar, dark backgrounds, surfaces
        primary: {
          DEFAULT: '#2A3582',
          50:  '#F0F1FA',
          100: '#DDE0F4',
          200: '#B8BDEA',
          300: '#8A91D8',
          400: '#5C65C4',
          500: '#3A44B4',
          600: '#2A3582',  // Primary Blue
          700: '#1E2665',
          800: '#141945',  // Deep navy (sidebar bg light)
          900: '#0F1426',  // Dark Navy (sidebar bg dark / main bg)
        },
        // Orange accent — CTAs, active states, badges
        accent: {
          DEFAULT: '#EB6700',
          50:  '#FFF4EC',
          100: '#FFE3C9',
          200: '#FFC794',
          300: '#FFA65C',
          400: '#FF8530',
          500: '#EB6700',
          600: '#C45700',
          700: '#9D4500',
          800: '#773400',
          900: '#522200',
        },
        // Slate alias — used for light mode UI surfaces
        brand: {
          blue:   '#2A3582',
          orange: '#EB6700',
          navy:   '#0F1426',
          slate:  '#485563',
          gray:   '#E5E7EB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl:  '0.75rem',
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
      boxShadow: {
        soft: '0 2px 12px 0 rgba(15, 20, 38, 0.08)',
        card: '0 1px 3px 0 rgba(15, 20, 38, 0.06), 0 1px 2px -1px rgba(15, 20, 38, 0.04)',
        glow: '0 0 0 3px rgba(235, 103, 0, 0.18)',
      },
      animation: {
        'fade-in':   'fadeIn 0.2s ease-out',
        'slide-up':  'slideUp 0.28s ease-out',
        'slide-down':'slideDown 0.28s ease-out',
        'spin-slow': 'spin 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
