/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          600: "#2563eb",
        },
        indigo: {
          600: "#4f46e5",
        },
        green: {
          600: "#16a34a",
        },
        purple: {
          600: "#9333ea",
        },
        pink: {
          600: "#db2777",
        },
        // 🔥 Override gray scale with HEX to kill oklch()
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
    },
  },
  plugins: [],
};




