import { useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import useCommandStore from "../../store/useCommandStore"
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
  const { isOpen, input, preview, mode, close, setInput, setPreview, clearPreview, setMode } =
    useCommandStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    if (isOpen) window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, close])

  const handleSubmit = () => {
    if (!input.trim()) return
    setPreview(
      mode === "director"
        ? {
            title: "Director Action Detected",
            description: "This will generate cinematic scene structure.",
            severity: "info",
          }
        : {
            title: "System Action Detected",
            description: "This will generate architecture documentation.",
            severity: "warning",
          }
    )
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
                      onClick={clearPreview}
                      className="px-4 py-1.5 rounded-lg text-sm text-textMuted hover:text-textPrimary transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={close}
                      className="px-4 py-1.5 rounded-lg text-sm bg-accentAI text-main hover:opacity-90 transition-opacity"
                    >
                      Confirm
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassPanel>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
