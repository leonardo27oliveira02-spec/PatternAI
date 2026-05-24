import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#4fc3f7',
          dark: '#0a0e1a',
          card: '#0d1220',
          border: '#1e2a45',
        },
      },
    },
  },
  plugins: [],
}

export default config
