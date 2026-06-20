import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        bg: 'var(--bg)',
        panel: 'var(--panel)',
        'panel-2': 'var(--panel-2)',
        'border-default': 'var(--border)',
        'border-strong': 'var(--border-strong)',
        text: 'var(--text)',
        'text-2': 'var(--text-2)',
        'text-3': 'var(--text-3)',
        accent: 'var(--accent)',
        'accent-2': 'var(--accent-2)',
        'accent-soft': 'var(--accent-soft)',
        ink: 'var(--ink)',
        'ink-fg': 'var(--ink-fg)',
      },
      keyframes: {
        scoreDraw: {
          from: { strokeDashoffset: '440' },
          to: { strokeDashoffset: '96.8' },
        },
        pageIn: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        drawerIn: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        overlayIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        floatUp: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.25' },
        },
        toastIn: {
          from: { opacity: '0', transform: 'translateY(8px) scale(0.96)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        scoreDraw: 'scoreDraw 1.5s cubic-bezier(.34,.85,.4,1) 0.15s forwards',
        pageIn: 'pageIn 0.35s ease forwards',
        drawerIn: 'drawerIn 0.34s cubic-bezier(.34,.85,.4,1) forwards',
        overlayIn: 'overlayIn 0.25s ease forwards',
        floatUp: 'floatUp 0.3s ease forwards',
        blink: 'blink 1.8s infinite',
        toastIn: 'toastIn 0.28s ease forwards',
      },
    },
  },
  plugins: [],
}

export default config
