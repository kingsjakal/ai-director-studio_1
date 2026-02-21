import GlassPanel from "../../components/glass/GlassPanel"
import useWorkspaceStore from "../../store/useWorkspaceStore"

export default function FramePreview() {
  const currentScene = useWorkspaceStore((state) => state.currentScene)
  const currentShot = useWorkspaceStore((state) => state.currentShot)

  return (
    <GlassPanel className="flex-1 flex items-center justify-center">
      <div className="w-full max-w-3xl aspect-video border border-soft rounded-2xl flex flex-col items-center justify-center gap-2">
        {currentShot ? (
          <>
            <span className="text-lg font-semibold text-textPrimary">{currentShot.title}</span>
            <span className="text-sm text-textMuted">{currentShot.camera}</span>
          </>
        ) : currentScene ? (
          <span className="text-lg font-semibold text-textPrimary">{currentScene.title}</span>
        ) : (
          <span className="text-sm text-textMuted">No scene selected</span>
        )}
      </div>
    </GlassPanel>
  )
}
