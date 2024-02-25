import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'black': '#000',
      'white': '#fff',
      'grey1': '#f9f9f9',
      'grey2': '#e6e6e6',
      'grey3': '#ddd',
      'grey4': '#ccc',
      'grey5': '#bbb',
      'grey6': '#aaa',
      'grey7': '#888',
      'grey8': '#777',
      'grey9': '#666',
      'grey10': '#555',
      'grey11': '#444',
      'grey12': '#333',
      'grey13': '#222',
      'grey14': '#111',
      'blue1': '#007bff',
      'blue2': '#0061ca',
      'green1': '#34c759',
      'red1': '#ff3a30',
      'orange1': '#ff9500',
      'yellow1': '#ffcc00',
      'purple1': '#af52de',
      'pink1': '#ff2d55',
      'indigo1': '#5856d6'
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
export default config;
