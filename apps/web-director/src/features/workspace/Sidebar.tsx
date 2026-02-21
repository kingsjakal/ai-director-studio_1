import { LayoutDashboard, FolderKanban, Clapperboard, Settings } from "lucide-react"
import useLayoutStore from "../../store/useLayoutStore"
import TooltipWrapper from "../../components/ui/Tooltip"

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Projects", icon: FolderKanban },
  { label: "Scenes", icon: Clapperboard },
  { label: "Settings", icon: Settings },
]

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useLayoutStore()

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
    </aside>
  )
}
