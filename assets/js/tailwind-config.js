// Shared Tailwind theme for the Play CDN. Loaded right after cdn.tailwindcss.com on every page.
tailwind.config = {
  theme: {
    extend: {
      colors: {
        grape: {
          50: '#f6f2ff',
          100: '#ede5ff',
          200: '#dccdff',
          300: '#c2a6ff',
          400: '#a374ff',
          500: '#8a4dfb',
          600: '#7a2ff0',
          700: '#6720d4',
          800: '#561dad',
          900: '#3f1782',
          950: '#270b57',
        },
        sun: {
          50: '#fffbea',
          100: '#fff3c4',
          200: '#ffe785',
          300: '#ffd646',
          400: '#ffc51c',
          500: '#f9a703',
          600: '#dd7f00',
        },
        sky2: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#bcdaff',
          300: '#8ec3ff',
          400: '#59a1ff',
          500: '#337dfc',
          600: '#1c5ef1',
          700: '#1549de',
          800: '#183db4',
          900: '#1a388d',
        },
        cream: '#fffaf3',
        ink: '#221b3a',
      },
      fontFamily: {
        display: ['Fredoka', 'ui-rounded', 'system-ui', 'sans-serif'],
        sans: ['Nunito', 'ui-rounded', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(63, 23, 130, 0.25)',
        pop: '6px 6px 0 0 #3f1782',
      },
      borderRadius: {
        blob: '2rem',
      },
    },
  },
};
