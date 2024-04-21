import { getTokens } from '../../config/tokenStore'
import { Request } from '../../config/axios'

export const getProjects = async () => {
  const tokens = getTokens()
  const res = (await Request('projects', tokens.accessToken, 'GET')) as {
    id: string
    name: string
    description: string
    finished: string
    teamId: string | null
  }[]

  return {
    status: 200,
    message: 'Success',
    projects: res
  }
}

export const getProjectById = async (payload: { id: string }) => {
  const tokens = getTokens()
  const res = (await Request(`projects/${payload.id}`, tokens.accessToken, 'GET')) as {
    id: string
    name: string
    description: string
    finished: boolean
    teamsList: any
  }

  return {
    status: 200,
    message: 'Success',
    project: res
  }
}
