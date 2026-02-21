import { create } from "zustand"

interface CommandState {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const useCommandStore = create<CommandState>()((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))

export default useCommandStore
