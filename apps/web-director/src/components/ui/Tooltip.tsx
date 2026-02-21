import * as TooltipPrimitive from "@radix-ui/react-tooltip"

interface TooltipWrapperProps {
  label: string
  children: React.ReactNode
}

export default function TooltipWrapper({ label, children }: TooltipWrapperProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          sideOffset={6}
          className="bg-panel border border-soft text-textPrimary rounded-md px-3 py-1 text-sm animate-fade-in"
        >
          {label}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
