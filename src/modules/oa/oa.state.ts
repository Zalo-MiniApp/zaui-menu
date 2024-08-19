import { create } from 'zustand'

type OAState = {
  showCount: number
  requestFollowDialog: boolean
  actions: {
    openRequestFollowDialog: () => void
    closeRequestFollowDialog: () => void
  }
}

export const useOaState = create<OAState>((set) => ({
  showCount: 0,
  requestFollowDialog: false,
  actions: {
    openRequestFollowDialog: () =>
      set(() => {
        return { requestFollowDialog: true }
      }),
    closeRequestFollowDialog: () => set((state) => ({ requestFollowDialog: false, showCount: state.showCount + 1 })),
  },
}))
