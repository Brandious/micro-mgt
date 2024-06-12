import { getTokens } from '../../config/tokenStore'
import { Request } from '../../config/axios'

export const getUsers = async () => {
  const tokens = getTokens()
  const res = (await Request('users', tokens.accessToken, 'GET')) as {
    id: string
    username: string
    email: string
    location: string
    roles: string[]
  }[]

  return {
    status: 200,
    message: 'Success',
    users: res
  }
}

export const assignUserToTeam = async (payload: { userId: string; teamIds: string[] }) => {
  const tokens = getTokens()
  const res = await Request(
    `users/${payload.userId}/teams/`,
    tokens.accessToken,
    'PUT',
    undefined,
    {
      teamIds: payload.teamIds
    }
  )

  return {
    status: 200,
    message: 'success',
    teams: res
  }
}
