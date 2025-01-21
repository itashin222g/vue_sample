/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media',
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'custom-bg-color': '#f5f0e6', // カスタムカラー
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
