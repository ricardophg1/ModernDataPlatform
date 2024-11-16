/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#ffffff',  // White main background
          light: '#f8fafc',   // Lighter shade
          dark: '#1e293b',    // Darker shade for contrast
          card: '#ffffff',    // Card background
          hover: '#f1f5f9',   // Hover state
        },
        primary: {
          DEFAULT: '#3b82f6',  // Blue primary
          light: '#60a5fa',    // Light blue
          dark: '#2563eb',     // Dark blue
        },
        secondary: {
          DEFAULT: '#64748b',  // Slate secondary
          light: '#94a3b8',    // Light slate
          dark: '#475569',     // Dark slate
        },
        custom: {
          white: '#f8fafc',    // Text white
          gray: '#e2e8f0',     // Light gray
          dark: '#0f172a',     // Dark blue
          blue: '#3b82f6',     // Brand blue
          sidebar: '#1e293b'   // Sidebar background
        }
      }
    },
  },
  plugins: [],
};