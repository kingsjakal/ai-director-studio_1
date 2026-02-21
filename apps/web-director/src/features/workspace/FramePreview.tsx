import GlassPanel from "../../components/glass/GlassPanel"

export default function FramePreview() {
  return (
    <GlassPanel className="flex-1 flex items-center justify-center">
      <div className="w-full max-w-3xl aspect-video border border-soft rounded-2xl flex items-center justify-center">
        <span className="text-sm text-textMuted">Frame Preview</span>
      </div>
    </GlassPanel>
  )
}
