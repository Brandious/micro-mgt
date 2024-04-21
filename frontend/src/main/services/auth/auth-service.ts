import { finished } from 'stream'
import { getTokens } from './../../config/tokenStore'
import { Request } from '../../config/axios'
import { saveTokens } from '../../config/tokenStore'

export const loginUser = async (payload: { username: string; password: string }) => {
  try {
    const res = (await Request('auth/signin', '', 'POST', undefined, payload)) as Promise<{
      accessToken: string
      refreshToken: string
    }>

    const tokens = await res

    if (!tokens)
      return {
        status: 401,
        message: 'Unauthorized'
      }

    saveTokens(tokens)

    const user = await getUser()

    return {
      status: 200,
      message: 'Success',
      user: user
    }
  } catch (err) {
    return {
      status: 401,
      message: 'Unauthorized'
    }
  }
}

export const getUser = async () => {
  const tokens = getTokens()
  const res = (await Request('users/self', tokens.accessToken, 'GET')) as {
    id: string
    username: string
    email: string
    department: string
    location: string
    roles: string[]
    teams: [
      {
        id: string
        name: string
        description: string
        project: {
          id: string
          name: string
          startDate: Date
          expectedFinishingDate: Date
          description: string
          boardID: string
          finished: boolean
        }
      }
    ]
  }

  return {
    status: 200,
    message: 'Success',
    user: res
  }
}
