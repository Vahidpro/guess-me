/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0f0a1a',
          card: 'rgba(255, 255, 255, 0.05)',
        },
        accent: {
          purple: '#7c3aed',
          blue: '#3b82f6',
          cyan: '#06b6d4',
        },
      },
      fontFamily: {
        vazir: ['Vazirmatn', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #0f0a1a 0%, #1a103a 50%, #0f1a2e 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(59, 130, 246, 0.1) 100%)',
        'gradient-button': 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
        'gradient-correct': 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
        'gradient-wrong': 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
      },
    },
  },
  plugins: [],
}
