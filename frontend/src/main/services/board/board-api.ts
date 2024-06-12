import { getTokens } from '../../config/tokenStore'
import { Request } from '../../config/axios'

export const getBoards = async () => {
  const tokens = getTokens()
  const res = (await Request('tasks/board', tokens.accessToken, 'GET')) as any
  return {
    status: 200,
    message: 'Success',
    boards: res
  }
}

export const getBoardIssuesById = async (payload: { id: string }) => {
  const tokens = getTokens()
  const res = (await Request(`tasks/issues/${payload.id}`, tokens.accessToken, 'GET')) as any

  return {
    status: 200,
    message: 'Success',
    boardIssues: res
  }
}
