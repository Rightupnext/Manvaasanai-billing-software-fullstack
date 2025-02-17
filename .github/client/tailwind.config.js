/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "chart-1": "#4CAF50", // Green
        "chart-2": "#FBBF24", // amber
        "chart-3": "#3B82F6", // Blue
        "chart-4": "#D946EF", // Fuchisa
        "chart-5": "#EC4899", // pink
        "chart-6": "#6EE7B7", // emerald
        "chart-7": "#64748B", // emerald
       
        "destructive": "#DC3545", // Red
      },
      opacity: {
        20: "0.2", // Allows usage like bg-destructive opacity-20
      },
      animation: {
        "bounce-slow": "bounce-slow 2s ease-in-out infinite",
      },
      keyframes: {
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
