import { TeamsData, getActions } from '@renderer/store/teams-store'

const { setTeam, setTeamById } = getActions()
const ipcRenderer = window.electron.ipcRenderer

export const getTeams = async () => {
  const response = (await window.api.getTeams()) as {
    status: number
    message: string
    teams: TeamsData[]
  }

  setTeam(response.teams as TeamsData[])
}

export const getTeamById = async (id: string) => {
  const response = (await ipcRenderer.invoke('api:getTeamById', { id: id })) as {
    status: number
    message: string
    team: TeamsData
  }

  setTeamById(response.team as any)
}
