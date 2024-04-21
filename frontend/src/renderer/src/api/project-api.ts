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
