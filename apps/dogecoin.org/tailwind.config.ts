import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'comic-neue': ['var(--font-comic-neue)'],
        'montserrat': ['var(--font-montserrat)'],
      },
      fontWeight: {
        extralight: '300',
        bold: '700',
      },
      colors: {
      },
      transitionTimingFunction: {
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
        '1000': '1000ms',
      },
    },
  },
  plugins: [
    function({ addBase }: { addBase: Function }) {
      addBase({
        '*': {
          '@apply transition-colors duration-150 ease-out': {},
        },
      })
    },
  ],
}

export default config 