import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Yekan Bakh', 'Tahoma', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        'chip': '12px',
        'card': '20px', 
        'hero': '34px',
        'pill': '999px',
      },
      boxShadow: {
        'card': '0 10px 34px rgba(35, 39, 46, 0.06)',
        'card-hover': '0 18px 48px rgba(35, 39, 46, 0.1)',
        'pop': '0 20px 60px rgba(35, 39, 46, 0.12)',
        'nav': '0 8px 30px rgba(35, 39, 46, 0.08)',
      },
      transitionTimingFunction: {
        'out-strong': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out-strong': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
      colors: {
        // Custom brand colors - use with hsl() function
        'primary-brand': '#6d7f9f',
        'primary-deep': '#56698a', 
        'primary-soft': '#eef1f6',
        'teal': '#93afb1',
        'teal-deep': '#6f9092',
        'teal-soft': '#eaf1f1',
        'surface': '#ffffff',
        'surface-2': '#f7f7f9',
        'line': '#d0d0d1',
        'line-soft': '#e8e8ea',
        'ink': '#23272e',
        'ink-2': '#454b55',
        'muted-brand': '#6b7280',
        'subtle': '#9aa1ac',
        'green-base': '#4f9d5b',
        'green-deep': '#2f7a3d', 
        'gold-base': '#e0a92e',
        'gold-deep': '#b8850f',
      },
    },
  },
  plugins: [],
}

export default config