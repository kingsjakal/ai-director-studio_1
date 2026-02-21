import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import useCommandStore from "../../store/useCommandStore"
import useWorkspaceStore from "../../store/useWorkspaceStore"
import GlassPanel from "../../components/glass/GlassPanel"

const severityStyles = {
  info: "bg-accentAI/10 text-accentAI",
  warning: "bg-amber-500/30 text-amber-300",
  critical: "bg-red-500/20 text-red-400",
}

const placeholders = {
  director: "Describe a cinematic action...",
  engineering: "Describe a system task...",
}

export default function CommandBar() {
  const { isOpen, input, preview, mode, directorSubMode, close, setInput, setPreview, clearPreview, setMode, setDirectorSubMode } =
    useCommandStore()
  const currentMovie = useWorkspaceStore((state) => state.currentMovie)
  const currentScene = useWorkspaceStore((state) => state.currentScene)
  const addScene = useWorkspaceStore((state) => state.addScene)
  const addShots = useWorkspaceStore((state) => state.addShots)
  const [pendingShots, setPendingShots] = useState<{ id: string; title: string; camera: string }[]>([])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    if (isOpen) window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, close])

  const isShotCommand = /\bshots?\b/i.test(input)

  const handleSubmit = () => {
    if (!input.trim()) return
    if (mode === "director" && isShotCommand) {
      setPreview({
        title: "Shot Generation Detected",
        description: "This will generate cinematic shots for the current scene.",
        severity: "info",
      })
    } else if (mode === "director") {
      setPreview({
        title: "Director Action Detected",
        description: "This will generate cinematic scene structure.",
        severity: "info",
      })
    } else {
      setPreview({
        title: "System Action Detected",
        description: "This will generate architecture documentation.",
        severity: "warning",
      })
    }
  }

  const generateMockShots = () => [
    { id: `shot-${Date.now()}-1`, title: "Wide Establishing Shot", camera: "24mm static" },
    { id: `shot-${Date.now()}-2`, title: "Close-up Emotional Reaction", camera: "85mm shallow depth" },
    { id: `shot-${Date.now()}-3`, title: "Over-the-Shoulder Dialogue", camera: "50mm handheld" },
    { id: `shot-${Date.now()}-4`, title: "Low Angle Power Shot", camera: "35mm tilted" },
    { id: `shot-${Date.now()}-5`, title: "Tracking Movement Shot", camera: "24mm dolly" },
  ]

  const handleConfirm = () => {
    if (mode === "director" && input.trim()) {
      if (isShotCommand && currentScene) {
        if (directorSubMode === "guided") {
          setPendingShots(generateMockShots())
          return
        }
        addShots(currentScene.id, generateMockShots())
      } else {
        addScene(input.trim())
      }
    }
    close()
    setPendingShots([])
  }

  const handleApproveShots = () => {
    if (currentScene && pendingShots.length > 0) {
      addShots(currentScene.id, pendingShots)
    }
    setPendingShots([])
    close()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
        >
          <GlassPanel className="w-full max-w-[600px] space-y-4">
            <div className="flex gap-2">
              <button
                onClick={() => setMode("director")}
                className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                  mode === "director"
                    ? "bg-accentAI/15 text-accentAI"
                    : "text-textMuted hover:text-textPrimary"
                }`}
              >
                🎬 Director
              </button>
              <button
                onClick={() => setMode("engineering")}
                className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                  mode === "engineering"
                    ? "bg-accentAI/15 text-accentAI"
                    : "text-textMuted hover:text-textPrimary"
                }`}
              >
                ⚙️ Engineering
              </button>
            </div>
            {mode === "director" && (
              <div className="flex gap-2">
                <button
                  onClick={() => setDirectorSubMode("auto")}
                  className={`px-2.5 py-0.5 rounded-md text-xs transition-colors ${
                    directorSubMode === "auto"
                      ? "bg-accentAI/10 text-accentAI"
                      : "text-textMuted hover:text-textPrimary"
                  }`}
                >
                  Auto
                </button>
                <button
                  onClick={() => setDirectorSubMode("guided")}
                  className={`px-2.5 py-0.5 rounded-md text-xs transition-colors ${
                    directorSubMode === "guided"
                      ? "bg-accentAI/10 text-accentAI"
                      : "text-textMuted hover:text-textPrimary"
                  }`}
                >
                  Guided
                </button>
              </div>
            )}
            {(currentMovie || currentScene) && (
              <p className="text-xs text-textMuted">
                Working on: {currentMovie?.title}{currentMovie && currentScene ? " / " : ""}{currentScene?.title}
              </p>
            )}
            <input
              autoFocus
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholders[mode]}
              className="w-full bg-main border border-soft rounded-lg px-4 py-2 text-sm text-textPrimary placeholder:text-textMuted outline-none focus:ring-1 focus:ring-accentAI"
            />

            <AnimatePresence>
              {preview && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-3"
                >
                  <div className="border border-soft rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-md font-medium ${severityStyles[preview.severity]}`}
                      >
                        {preview.severity}
                      </span>
                      <span className="text-sm font-semibold text-textPrimary">
                        {preview.title}
                      </span>
                    </div>
                    <p className="text-sm text-textMuted">
                      {preview.description}
                    </p>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => { clearPreview(); setPendingShots([]) }}
                      className="px-4 py-1.5 rounded-lg text-sm text-textMuted hover:text-textPrimary transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirm}
                      className="px-4 py-1.5 rounded-lg text-sm bg-accentAI text-main hover:opacity-90 transition-opacity"
                    >
                      Confirm
                    </button>
                  </div>

                  <AnimatePresence>
                    {pendingShots.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="space-y-3"
                      >
                        <span className="text-xs text-textMuted">Generated Shots</span>
                        <div className="border border-soft rounded-lg divide-y divide-soft">
                          {pendingShots.map((shot) => (
                            <div key={shot.id} className="px-4 py-2 flex items-center justify-between">
                              <span className="text-sm text-textPrimary">{shot.title}</span>
                              <span className="text-xs text-textMuted">{shot.camera}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={handleApproveShots}
                            className="px-4 py-1.5 rounded-lg text-sm bg-accentAI text-main hover:opacity-90 transition-opacity"
                          >
                            Approve Shots
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassPanel>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
