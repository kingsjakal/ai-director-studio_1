import { create } from "zustand"

interface WorkspaceItem {
  id: string
  title: string
}

interface Shot {
  id: string
  title: string
  camera: string
}

interface WorkspaceState {
  currentMovie: WorkspaceItem | null
  currentScene: WorkspaceItem | null
  currentShot: Shot | null
  scenes: WorkspaceItem[]
  shots: Record<string, Shot[]>
  setMovie: (movie: WorkspaceItem | null) => void
  setScene: (scene: WorkspaceItem | null) => void
  addScene: (title: string) => void
  clearScene: () => void
  addShots: (sceneId: string, shots: Shot[]) => void
  setShot: (shot: Shot | null) => void
}

const useWorkspaceStore = create<WorkspaceState>()((set) => ({
  currentMovie: { id: "movie-1", title: "Untitled Project" },
  currentScene: { id: "scene-1", title: "Opening Scene" },
  currentShot: null,
  scenes: [{ id: "scene-1", title: "Opening Scene" }],
  shots: {},
  setMovie: (movie) => set({ currentMovie: movie }),
  setScene: (scene) => set({ currentScene: scene }),
  addScene: (title) => {
    const scene = { id: `scene-${Date.now()}`, title }
    set((state) => ({
      scenes: [...state.scenes, scene],
      currentScene: scene,
    }))
  },
  clearScene: () => set({ currentScene: null }),
  addShots: (sceneId, shots) =>
    set((state) => ({
      shots: { ...state.shots, [sceneId]: [...(state.shots[sceneId] || []), ...shots] },
      currentShot: shots[0] ?? state.currentShot,
    })),
  setShot: (shot) => set({ currentShot: shot }),
}))

export default useWorkspaceStore
