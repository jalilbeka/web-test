/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                neonCyan: '#00f3ff',
                neonMagenta: '#ff00ff',
                neonViolet: '#9d00ff',
                glass: 'rgba(255, 255, 255, 0.1)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
}
// In client/tailwind.config.js
module.exports = {
  theme: {
    extend: {
      dropShadow: {
        'glow': '0 0 10px rgba(0, 243, 255, 0.9)',
      }
    }
  }
}
