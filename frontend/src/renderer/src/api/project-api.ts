import { ProjectData, getActions } from '@renderer/store/projects-store'

const ipcRenderer = window.electron.ipcRenderer

const { setProject, setProjectById } = getActions()

export const getProjects = async () => {
  const response = (await window.api.getProjects()) as {
    status: number
    message: string
    projects: ProjectData[]
  }

  setProject(response.projects as ProjectData[])
}

export const getProjectById = async (id: string) => {
  const response = (await ipcRenderer.invoke('api:getProjectById', { id: id })) as {
    status: number
    message: string
    project: ProjectData
  }

  setProjectById(response.project as any)
}

export const createProject = async (payload: { name: string; description: string }) => {
  const response = (await ipcRenderer.invoke('api:createProject', payload)) as {
    status: number
    message: string
    project: ProjectData
  }

  return response
}

export const assignTeamToProject = async (payload: { projectId: string; teamId: string }) => {
  const response = (await ipcRenderer.invoke('api:assignTeamToProject', payload)) as {
    status: number
  }

  return response
}

export const assignBoardToProject = async (payload: { projectId: string; boardId: string }) => {
  const response = (await ipcRenderer.invoke('api:assignBoardToProject', payload)) as {
    status: number
  }

  return response
}

export const finalizeProject = async (payload: { projectId: string }) => {
  const response = (await ipcRenderer.invoke('api:finalizeProject', payload)) as {
    status: number
  }

  return response
}
