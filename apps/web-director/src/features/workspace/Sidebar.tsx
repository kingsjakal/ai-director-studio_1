import { LayoutDashboard, FolderKanban, Clapperboard, Settings } from "lucide-react"
import useLayoutStore from "../../store/useLayoutStore"
import useWorkspaceStore from "../../store/useWorkspaceStore"
import TooltipWrapper from "../../components/ui/Tooltip"

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Projects", icon: FolderKanban },
  { label: "Scenes", icon: Clapperboard },
  { label: "Settings", icon: Settings },
]

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useLayoutStore()
  const { scenes, currentScene, setScene, shots, currentShot, setShot } = useWorkspaceStore()

  return (
    <aside
      className={`bg-panel border-r border-soft h-screen flex flex-col p-4 gap-2 transition-all duration-300 ${
        sidebarCollapsed ? "w-[72px]" : "w-[260px]"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="text-textMuted hover:text-accentAI transition-colors mb-4 self-end"
      >
        {sidebarCollapsed ? "→" : "←"}
      </button>

      <nav className="flex flex-col gap-1">
        {menuItems.map(({ label, icon: Icon }) => {
          const item = (
            <button
              key={label}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-textMuted hover:text-textPrimary hover:bg-main transition-colors ${
                sidebarCollapsed ? "justify-center" : ""
              }`}
            >
              <Icon size={18} />
              {!sidebarCollapsed && <span>{label}</span>}
            </button>
          )

          return sidebarCollapsed ? (
            <TooltipWrapper key={label} label={label}>
              {item}
            </TooltipWrapper>
          ) : (
            item
          )
        })}
      </nav>

      {!sidebarCollapsed && scenes.length > 0 && (
        <div className="mt-4 flex flex-col gap-1">
          <span className="text-xs text-textMuted px-3 mb-1">Scenes</span>
          {scenes.map((scene) => (
            <div key={scene.id}>
              <button
                onClick={() => setScene(scene)}
                className={`w-full text-left rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  currentScene?.id === scene.id
                    ? "text-textPrimary bg-main"
                    : "text-textMuted hover:text-textPrimary hover:bg-main"
                }`}
              >
                {scene.title}
              </button>
              {currentScene?.id === scene.id && shots[scene.id]?.length > 0 && (
                <div className="ml-4 mt-1 flex flex-col gap-0.5">
                  {shots[scene.id].map((shot) => (
                    <button
                      key={shot.id}
                      onClick={() => setShot(shot)}
                      className={`text-left rounded-md px-2 py-1 text-xs transition-colors ${
                        currentShot?.id === shot.id
                          ? "text-textPrimary"
                          : "text-textMuted hover:text-textPrimary"
                      }`}
                    >
                      {shot.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </aside>
  )
}
