// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(319deg, #ffcb43 0%, #ff6425 37%, #ff0016 100%)',
      },
      transform: {
        'scale-80': 'scale(0.01)',
        'scale-90': 'scale(0.9)',
        'scale-110': 'scale(1.1)',
        'scale-120': 'scale(1.2)',
      },
    },
  },
  plugins: [],
}
