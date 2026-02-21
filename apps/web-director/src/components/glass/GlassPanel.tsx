interface GlassPanelProps {
  children: React.ReactNode
  className?: string
}

function GlassPanel({ children, className = "" }: GlassPanelProps) {
  return (
    <div
      className={`bg-panel border border-soft rounded-2xl p-6 backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  )
}

export default GlassPanel
