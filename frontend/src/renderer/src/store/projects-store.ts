// import { projectData } from '@renderer/store/project-store'
import { createStore } from 'zustand/vanilla'
import { useStore } from 'zustand'

import { useStoreWithEqualityFn } from 'zustand/traditional'
import { z } from 'zod'
import { TeamSchema } from './teams-store'

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  finished: z.boolean(),
  teamsList: z.array(TeamSchema)
})

export type ProjectData = z.infer<typeof ProjectSchema>

type ProjectStore = {
  project: ProjectData[] | null
  projectById: ProjectData | null

  actions: {
    setProject: (project: ProjectData[]) => void
    setProjectById: (project: ProjectData) => void
  }
}

const projectStore = createStore<ProjectStore>()((set) => ({
  project: null,
  projectById: null,

  actions: {
    setProject: async (project: ProjectData[]) => {
      const res = await window.api.getProjects()
      if (res) {
        set({ project: res.projects })
      } else set({ project })
    },

    setProjectById: async (project: ProjectData) => {
      set({ projectById: project })
    }
  }
}))

export type ExtractState<S> = S extends {
  getState: () => infer T
}
  ? T
  : never

type Params<U> = Parameters<typeof useStore<typeof projectStore, U>>

const projectSelector = (state: ExtractState<typeof projectStore>) => state.project
const projectByIdSelector = (state: ExtractState<typeof projectStore>) => state.projectById
const actionsSelector = (state: ExtractState<typeof projectStore>) => state.actions

export const getProject = () => projectSelector(projectStore.getState())
export const getActions = () => actionsSelector(projectStore.getState())

function useProjectStore<U>(selector: Params<U>[1], equalityFn?: Params<U>[2]) {
  return useStoreWithEqualityFn(projectStore, selector, equalityFn)
}

export const useProject = () => useProjectStore(projectSelector)
export const useProjectById = () => useProjectStore(projectByIdSelector)
export const useActions = () => useProjectStore(actionsSelector)
