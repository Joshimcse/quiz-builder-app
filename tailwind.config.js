module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      width: {
        900: '900px',
      },
      height: {
        200: '200px',
      },
    },
    fontSize: {
      8: '8px',
      10: '10px',
      12: '12px',
      14: '14px',
      16: '16px',
      18: '18px',
      20: '20px',
      21: '21px',
      22: '22px',
      24: '24px',
      26: '26px',
      28: '28px',
      30: '30px',
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
