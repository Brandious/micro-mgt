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
