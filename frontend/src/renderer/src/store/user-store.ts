// import { UserData } from '@renderer/store/user-store'
import { createStore } from 'zustand/vanilla'
import { useStore } from 'zustand'

import { useStoreWithEqualityFn } from 'zustand/traditional'
import { z } from 'zod'

// const roles = z.enum(['manager', 'user'])

// type Role = z.infer<typeof roles>

// export const UserSchema = z.object({
//   userId: z.string(),
//   username: z.string(),
//   email: z.string(),
//   location: z.string(),
//   department: z.string(),
//   id: z.string(),
//   roles: z.array(z.string())
// })

export enum UserStatus {
  Online = 'online',
  Offline = 'offline',
  Idle = 'idle',
  Undefined = 'undefined'
}
const Project = z.object({
  id: z.string(),
  name: z.string(),
  startDate: z.date(),
  expectedFinishingDate: z.date(),
  description: z.string(),
  boardID: z.string(),
  finished: z.boolean()
})

const Team = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  project: Project
})

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  status: z.nativeEnum(UserStatus),
  department: z.string(),
  location: z.string(),
  roles: z.array(z.string()),
  teams: z.array(Team)
})

export type UserData = z.infer<typeof UserSchema>

type UserStore = {
  user: UserData | null

  actions: {
    setUser: (user: UserData) => void
    refreshUser: () => void
    logout: () => void
  }
}

const userStore = createStore<UserStore>()((set) => ({
  user: null,

  actions: {
    setUser: async (user: UserData) => {
      try {
        const res = await window.api.getUser()
        if (res) {
          set({ user: res.user })
        } else set({ user })
      } catch (err) {
        console.log(err)
      }
    },
    refreshUser: async () => {
      const res = await window.api.getUser()
      if (res) {
        set({ user: res.user })
      }
    },
    logout: () => set({ user: null })
  }
}))

export type ExtractState<S> = S extends {
  getState: () => infer T
}
  ? T
  : never

type Params<U> = Parameters<typeof useStore<typeof userStore, U>>

const userSelector = (state: ExtractState<typeof userStore>) => state.user
const actionsSelector = (state: ExtractState<typeof userStore>) => state.actions

export const getUser = () => userSelector(userStore.getState())
export const getActions = () => actionsSelector(userStore.getState())

function useUserStore<U>(selector: Params<U>[1], equalityFn?: Params<U>[2]) {
  return useStoreWithEqualityFn(userStore, selector, equalityFn)
}

export const useUser = () => useUserStore(userSelector)
export const useActions = () => useUserStore(actionsSelector)
