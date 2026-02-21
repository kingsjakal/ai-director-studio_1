import useThemeStore from "../../store/useThemeStore"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <button
      onClick={toggleTheme}
      className="bg-panel border border-soft rounded-lg px-3 py-1.5 text-sm text-textMuted hover:text-accentAI transition-colors"
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  )
}
