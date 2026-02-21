import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import useLayoutStore from "../../store/useLayoutStore"
import useWorkspaceStore from "../../store/useWorkspaceStore"
import ThemeToggle from "../../components/ui/ThemeToggle"

export default function Topbar() {
  const { sidebarCollapsed, toggleSidebar } = useLayoutStore()
  const currentMovie = useWorkspaceStore((state) => state.currentMovie)
  const currentScene = useWorkspaceStore((state) => state.currentScene)

  return (
    <header className="bg-panel border-b border-soft h-16 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg text-textMuted hover:text-textPrimary hover:bg-main/40 transition-colors"
        >
          {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
        <div className="flex items-center gap-2 text-sm">
          {currentMovie && (
            <span className="font-semibold text-textPrimary">{currentMovie.title}</span>
          )}
          {currentMovie && currentScene && (
            <span className="text-textMuted">/</span>
          )}
          {currentScene && (
            <span className="text-textMuted">{currentScene.title}</span>
          )}
        </div>
      </div>
      <ThemeToggle />
    </header>
  )
}
