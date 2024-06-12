// import { boardData } from '@renderer/store/board-store'
import { useStore } from 'zustand'
import { createStore } from 'zustand/vanilla'

// import { createBoard } from '@renderer/api/board-api'
// import { z } from 'zod'
import { useStoreWithEqualityFn } from 'zustand/traditional'
const ipcRenderer = window.electron.ipcRenderer

// export const BoardSchema = z.object({
//   id: z.string(),
//   name: z.string(),
//   description: z.string(),
//   finished: z.boolean(),
//   teamsList: z.array(TeamSchema)
// })

// export type BoardData = z.infer<typeof BoardSchema>

type BoardStore = {
  boards: any
  boardById: any

  actions: {
    setBoard: (board: any) => void
    setBoardById: (board: any) => void
    // createBoard: (payload: { name: string; description: string }) => void
  }
}

const boardStore = createStore<BoardStore>()((set) => ({
  boards: null,
  boardById: null,

  actions: {
    setBoard: async (boards: any) => {
      const res = await ipcRenderer.invoke('api:getBoard')

      if (res) {
        set({ boards: res.boards })
      } else set({ boards })
    },

    setBoardById: async (boards: any) => {
      set({ boardById: boards })
    }
  }
}))

export type ExtractState<S> = S extends {
  getState: () => infer T
}
  ? T
  : never

type Params<U> = Parameters<typeof useStore<typeof boardStore, U>>

const boardSelector = (state: ExtractState<typeof boardStore>) => state.boards
const boardByIdSelector = (state: ExtractState<typeof boardStore>) => state.boardById
const actionsSelector = (state: ExtractState<typeof boardStore>) => state.actions

export const getBoard = () => boardSelector(boardStore.getState())
export const getActions = () => actionsSelector(boardStore.getState())

function useBoardStore<U>(selector: Params<U>[1], equalityFn?: Params<U>[2]) {
  return useStoreWithEqualityFn(boardStore, selector, equalityFn)
}

export const useBoard = () => useBoardStore(boardSelector)
export const useBoardById = () => useBoardStore(boardByIdSelector)
export const useActions = () => useBoardStore(actionsSelector)
