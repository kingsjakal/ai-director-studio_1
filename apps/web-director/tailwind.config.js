/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        main: "var(--bg-main)",
        panel: "var(--bg-panel)",
        textPrimary: "var(--text-primary)",
        textMuted: "var(--text-muted)",
        accentAI: "var(--accent-ai)",
      },
      borderColor: {
        soft: "var(--border-soft)"
      }
    },
  },
  plugins: [],
}