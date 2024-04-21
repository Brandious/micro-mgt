import { createStore, useStore } from 'zustand'
import { ExtractState } from './user-store'
import { useStoreWithEqualityFn } from 'zustand/traditional'

type WorkStore = {
  working: boolean

  actions: {
    setWorking: (working: boolean) => void
  }
}

const workStore = createStore<WorkStore>()((set) => ({
  working: false,

  actions: {
    setWorking: (working: boolean) => set({ working })
  }
}))

type Params<U> = Parameters<typeof useStore<typeof workStore, U>>

const workSelector = (state: ExtractState<typeof workStore>) => state.working
const actionsSelector = (state: ExtractState<typeof workStore>) => state.actions

export const getWorking = () => workSelector(workStore.getState())
export const getActions = () => actionsSelector(workStore.getState())

function useWorkStore<U>(selector: Params<U>[1], equalityFn?: Params<U>[2]) {
  return useStoreWithEqualityFn(workStore, selector, equalityFn)
}

export const useWork = () => useWorkStore(workSelector)
export const useActions = () => useWorkStore(actionsSelector)
