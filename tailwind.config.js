/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0D0D1A',
        surface: '#13131F',
        'surface-2': '#1A1A2E',
        border: 'rgba(255,255,255,0.08)',
        primary: '#FF6B35',
        'primary-hover': '#FF8C5A',
        secondary: '#7C3AED',
        success: '#10B981',
        blue: '#3B82F6',
        purple: '#8B5CF6',
        text: '#F1F0F5',
        'text-muted': '#9CA3AF',
        'text-faint': '#4B5563',
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'orange-glow': '0 0 24px rgba(255,107,53,0.15)',
        'orange-glow-lg': '0 0 40px rgba(255,107,53,0.25)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
