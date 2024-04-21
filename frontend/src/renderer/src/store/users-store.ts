import { createStore } from 'zustand/vanilla'
import { useStore } from 'zustand'

import { useStoreWithEqualityFn } from 'zustand/traditional'
import { z } from 'zod'

const ipcRenderer = window.electron.ipcRenderer

export const UsersSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  location: z.string(),
  roles: z.array(z.string())
})

export type UsersData = z.infer<typeof UsersSchema>

type UsersStore = {
  users: UsersData[] | null

  actions: {
    setUsers: (users: UsersData[]) => void
  }
}

const usersStore = createStore<UsersStore>()((set) => ({
  users: null,

  actions: {
    setUsers: async (users: UsersData[]) => {
      const res = await ipcRenderer.invoke('api:getUsers')

      if (res) {
        set({ users: res.users })
      } else set({ users })
    },
    logout: () => set({ users: null })
  }
}))

export type ExtractState<S> = S extends {
  getState: () => infer T
}
  ? T
  : never

type Params<U> = Parameters<typeof useStore<typeof usersStore, U>>

const usersSelector = (state: ExtractState<typeof usersStore>) => state.users
const actionsSelector = (state: ExtractState<typeof usersStore>) => state.actions

export const getUsers = () => usersSelector(usersStore.getState())
export const getActions = () => actionsSelector(usersStore.getState())

function useUsersStore<U>(selector: Params<U>[1], equalityFn?: Params<U>[2]) {
  return useStoreWithEqualityFn(usersStore, selector, equalityFn)
}

export const useUsers = () => useUsersStore(usersSelector)
export const useActions = () => useUsersStore(actionsSelector)
