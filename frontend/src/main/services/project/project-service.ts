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

export const createProject = async (payload: { name: string; description: string }) => {
  console.log(payload)
  const tokens = getTokens()
  const res = (await Request('projects', tokens.accessToken, 'POST', undefined, payload)) as {
    id: string
    name: string
    description: string
    finished: boolean
  }

  return {
    status: 200,
    message: 'Success',
    project: res
  }
}

export const assignTeamToProject = async (payload: { projectId: string; teamId: string }) => {
  const tokens = getTokens()
  const res = (await Request(
    `projects/${payload.projectId}/teams/${payload.teamId}`,
    tokens.accessToken,
    'PUT',
    undefined
  )) as {
    status: number
    message: string
    project: any
  }

  return {
    status: 200,
    message: 'Success',
    project: res
  }
}

export const assignBoardToProject = async (payload: { projectId: string; boardId: string }) => {
  const tokens = getTokens()

  const bodyData = {
    boardId: payload.boardId
  }

  const res = (await Request(
    `projects/${payload.projectId}/boardId`,
    tokens.accessToken,
    'PUT',
    undefined,
    bodyData
  )) as {
    status: number
    message: string
    project: any
  }

  return {
    status: 200,
    message: 'Success',
    project: res
  }
}

export const finalizeProject = async (payload: { projectId: string }) => {
  const tokens = getTokens()
  const res = (await Request(
    `projects/${payload.projectId}/finalize`,
    tokens.accessToken,
    'PUT',
    undefined
  )) as {
    status: number
    message: string
    project: any
  }

  return {
    status: 200,
    message: 'Success',
    project: res
  }
}
