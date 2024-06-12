import { getTokens } from '../../config/tokenStore'
import { Request } from '../../config/axios'

export const getTeams = async () => {
  const tokens = getTokens()
  const res = (await Request('teams', tokens.accessToken, 'GET')) as {
    id: string
    name: string
  }[]

  return {
    status: 200,
    message: 'Success',
    teams: res
  }
}

export const getTeamById = async (payload: { id: string }) => {
  const tokens = getTokens()
  const res = (await Request(`teams/${payload.id}`, tokens.accessToken, 'GET')) as {
    id: string
    name: string
    users: any
  }

  return {
    status: 200,
    message: 'Success',
    team: res
  }
}

export const createTeam = async (payload: { name: string; projectId?: string }) => {
  const tokens = getTokens()
  const res = (await Request('teams', tokens.accessToken, 'POST', undefined, payload)) as {
    id: string
    name: string
  }

  return {
    status: 200,
    message: 'Success',
    team: res
  }
}
