import { getSessionID, saveSessionID } from './../../config/workSessionStore'
import { getTokens } from '../../config/tokenStore'
import { Request } from '../../config/axios'

export const startDay = async ({ userId }: { userId: string }) => {
  const tokens = getTokens()
  const res = (await Request('work/startDay', tokens.accessToken, 'POST', undefined, {
    userId: userId
  })) as Promise<{
    startTime: Date
    user: {
      id: string
    }
    endTime: Date | null
    id: string
  }>

  const session = await res

  saveSessionID(session.id)

  return true
}

export const endDay = async () => {
  const tokens = getTokens()
  const workSession = getSessionID()

  const res = (await Request('work/endDay', tokens.accessToken, 'POST', undefined, {
    sessionId: workSession
  })) as Promise<{
    startTime: Date
    user: {
      id: string
    }
    endTime: Date | null
    id: string
  }>

  const endSession = await res

  return false
}
