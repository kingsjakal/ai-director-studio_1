import { useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import useCommandStore from "../../store/useCommandStore"
import GlassPanel from "../../components/glass/GlassPanel"

export default function CommandBar() {
  const { isOpen, close } = useCommandStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    if (isOpen) window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, close])

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
            <input
              autoFocus
              type="text"
              placeholder="Type a command..."
              className="w-full bg-main border border-soft rounded-lg px-4 py-2 text-sm text-textPrimary placeholder:text-textMuted outline-none focus:ring-1 focus:ring-accentAI"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={close}
                className="px-4 py-1.5 rounded-lg text-sm text-textMuted hover:text-textPrimary transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-1.5 rounded-lg text-sm bg-accentAI text-main hover:opacity-90 transition-opacity">
                Confirm
              </button>
            </div>
          </GlassPanel>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
