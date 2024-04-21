import { getProjects } from './../main/services/project/project-service'
import { ElectronAPI } from '@electron-toolkit/preload'
import { ProjectData } from '@renderer/store/projects-store'
import { UserData } from '@renderer/store/user-store'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      login: (payload: { username: string; password: string }) => Promise<{}>
      getUser: () => Promise<{ status: number; message: string; user: UserData }>

      startDay: (payload: { userId: string }) => Promise<boolean>
      endDay: () => Promise<boolean>

      getProjects: () => Promise<{ status: number; message: string; projects: ProjectData[] }>

      getTeams: () => Promise<{ status: number; message: string; teams: TeamsData[] }>
    }
    electronComponents: {
      openDialog: () => Promise<void>
    }
  }
}
