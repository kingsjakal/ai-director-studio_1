import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import useLayoutStore from "../../store/useLayoutStore"
import ThemeToggle from "../../components/ui/ThemeToggle"

export default function Topbar() {
  const { sidebarCollapsed, toggleSidebar } = useLayoutStore()

  return (
    <header className="bg-panel border-b border-soft h-16 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg text-textMuted hover:text-textPrimary hover:bg-main/40 transition-colors"
        >
          {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
        <h1 className="text-sm font-semibold text-textPrimary">AI Director Studio</h1>
      </div>
      <ThemeToggle />
    </header>
  )
}
