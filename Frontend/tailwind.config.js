/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // NCA Saudi Official Colors
        'nca-primary': '#006C35',      // Saudi Green
        'nca-secondary': '#C4A962',    // Gold
        'nca-dark': '#2C2C2C',         // Dark Gray
        'nca-light': '#F5F5F5',        // Light Gray
        
        // Status Colors
        'status-implemented': '#4CAF50',
        'status-partial': '#FF9800',
        'status-not-implemented': '#F44336',
        'status-pending': '#2196F3',
      },
      fontFamily: {
        sans: ['IBM Plex Sans Arabic', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
