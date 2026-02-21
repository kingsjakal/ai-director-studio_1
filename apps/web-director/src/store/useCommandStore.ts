import { create } from "zustand"

type Severity = "info" | "warning" | "critical"
type CommandMode = "director" | "engineering"
type DirectorSubMode = "auto" | "guided"

interface CommandPreview {
  title: string
  description: string
  severity: Severity
}

interface CommandState {
  isOpen: boolean
  input: string
  preview: CommandPreview | null
  mode: CommandMode
  directorSubMode: DirectorSubMode
  open: () => void
  close: () => void
  toggle: () => void
  setInput: (value: string) => void
  setPreview: (preview: CommandPreview) => void
  clearPreview: () => void
  setMode: (mode: CommandMode) => void
  setDirectorSubMode: (mode: DirectorSubMode) => void
}

const useCommandStore = create<CommandState>()((set) => ({
  isOpen: false,
  input: "",
  preview: null,
  mode: "director",
  directorSubMode: "auto",
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false, input: "", preview: null }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setInput: (value) => set({ input: value }),
  setPreview: (preview) => set({ preview }),
  clearPreview: () => set({ preview: null }),
  setMode: (mode) => set({ mode }),
  setDirectorSubMode: (directorSubMode) => set({ directorSubMode }),
}))

export default useCommandStore
