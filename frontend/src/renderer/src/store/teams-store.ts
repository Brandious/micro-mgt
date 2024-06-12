// import { projectData } from '@renderer/store/project-store'
import { createStore } from 'zustand/vanilla'
import { useStore } from 'zustand'

import { useStoreWithEqualityFn } from 'zustand/traditional'
import { z } from 'zod'
import { UserSchema } from './user-store'

export const TeamSchema = z.object({
  id: z.string(),
  name: z.string(),
  users: z.array(UserSchema),
  project: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    finished: z.boolean(),
    teams: z.array(z.string())
  })
})

export type TeamsData = z.infer<typeof TeamSchema>

type TeamStore = {
  teams: TeamsData[] | null
  team: TeamsData | null

  actions: {
    setTeam: (team: TeamsData[]) => void
    setTeamById: (team: TeamsData) => void
  }
}

const TeamStore = createStore<TeamStore>()((set) => ({
  teams: null,
  team: null,

  actions: {
    setTeam: async (teams: TeamsData[]) => {
      const res = await window.api.getTeams()
      if (res) {
        set({ teams: res.teams })
      } else set({ teams })
    },

    setTeamById: async (team: TeamsData) => {
      set({ team })
    }
  }
}))

export type ExtractState<S> = S extends {
  getState: () => infer T
}
  ? T
  : never

type Params<U> = Parameters<typeof useStore<typeof TeamStore, U>>

const teamSelector = (state: ExtractState<typeof TeamStore>) => state.teams
const teamByIdSelector = (state: ExtractState<typeof TeamStore>) => state.team
const actionsSelector = (state: ExtractState<typeof TeamStore>) => state.actions

export const getTeams = () => teamSelector(TeamStore.getState())
export const getActions = () => actionsSelector(TeamStore.getState())

function useTeamStore<U>(selector: Params<U>[1], equalityFn?: Params<U>[2]) {
  return useStoreWithEqualityFn(TeamStore, selector, equalityFn)
}

export const useTeams = () => useTeamStore(teamSelector)
export const useTeamById = () => useTeamStore(teamByIdSelector)
export const useActions = () => useTeamStore(actionsSelector)
