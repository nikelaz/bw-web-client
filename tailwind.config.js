/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    colors: {
      'black': '#000',
      'white': '#fff',
      'grey1': 'var(--color-grey1, #f9f9f9)',
      'grey2': 'var(--color-grey2, #f9f9f9)',
      'grey3': 'var(--color-grey3, #f9f9f9)',
      'grey4': 'var(--color-grey4, #e6e6e6)',
      'grey5': 'var(--color-grey5, #ddd)',
      'grey6': 'var(--color-grey6, #ccc)',
      'grey7': 'var(--color-grey7, #bbb)',
      'grey8': 'var(--color-grey8, #aaa)',
      'grey9': 'var(--color-grey9, #888)',
      'grey10': 'var(--color-grey10, #777)',
      'grey11': 'var(--color-grey11, #666)',
      'grey12': 'var(--color-grey12, #555)',
      'grey13': 'var(--color-grey13, #444)',
      'grey14': 'var(--color-grey14, #333)',
      'grey15': 'var(--color-grey15, #222)',
      'grey16': 'var(--color-grey16, #111)',
      'blue1': 'var(--color-blue1, #007bff)',
      'blue2': 'var(--color-blue2, #0061ca)',
      'green1': 'var(--color-green1, #34c759)',
      'red1': 'var(--color-red1, #ff3a30)',
      'orange1': 'var(--color-orange1, #ff9500)',
      'yellow1': 'var(--color-yellow1, #ffcc00)',
      'purple1': 'var(--color-purple1, #af52de)',
      'pink1': 'var(--color-pink1, #ff2d55)',
      'indigo1': 'var(--color-indigo1, #5856d6)'
    },
    fontSize: {
      sm: ['0.857rem', { lineHeight: '1.5' }],
      base: ['1rem', { lineHeight: '1.5' }],
      lg: ['1.25rem', { lineHeight: '1.25' }],
      xl: ['1.5rem', { lineHeight: '1.1' }],
      '2xl': ['1.75rem', { lineHeight: '1' }],
      '3xl': ['2rem', { lineHeight: '1' }]
    },
    zIndex: {
      auto: 'auto',
      0: '0',
      1: '1',
      2: '2',
      3: '3'
    },
    extend: {
      borderRadius: {
        xl: '0.714rem'
      },
    }
  },
  plugins: [],
};
