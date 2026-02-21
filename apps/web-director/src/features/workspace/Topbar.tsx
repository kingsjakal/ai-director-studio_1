import ThemeToggle from "../../components/ui/ThemeToggle"

export default function Topbar() {
  return (
    <header className="bg-panel border-b border-soft h-16 px-6 flex items-center justify-between">
      <h1 className="text-sm font-semibold text-textPrimary">AI Director Studio</h1>
      <ThemeToggle />
    </header>
  )
}
