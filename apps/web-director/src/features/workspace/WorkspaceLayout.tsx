import Sidebar from "./Sidebar"
import Topbar from "./Topbar"
import Timeline from "./Timeline"

export default function WorkspaceLayout() {
  return (
    <div className="h-screen bg-main text-textPrimary flex">
      <Sidebar />
      <div className="flex-1 flex flex-col gap-6">
        <Topbar />
        <main className="flex-1 p-6">
          {/* Workspace content area */}
        </main>
        <Timeline />
      </div>
    </div>
  )
}
