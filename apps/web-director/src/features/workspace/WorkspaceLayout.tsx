import { useEffect } from "react"
import Sidebar from "./Sidebar"
import Topbar from "./Topbar"
import Timeline from "./Timeline"
import FramePreview from "./FramePreview"
import CommandBar from "../ai/CommandBar"
import useCommandStore from "../../store/useCommandStore"

export default function WorkspaceLayout() {
  const toggle = useCommandStore((state) => state.toggle)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault()
        toggle()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggle])

  return (
    <div className="h-screen bg-main text-textPrimary flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-6 gap-6 flex flex-col">
          <FramePreview />
        </main>
        <Timeline />
      </div>
      <CommandBar />
    </div>
  )
}
