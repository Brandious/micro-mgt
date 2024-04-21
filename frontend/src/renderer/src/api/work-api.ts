import { getUser } from '@renderer/store/user-store'
import { getActions } from '@renderer/store/work-store'

const { setWorking } = getActions()

export const startDay = async () => {
  const user = getUser()

  const response = await window.api.startDay({ userId: user?.id! })

  setWorking(response)
  return response
}

export const endDay = async () => {
  const response = await window.api.endDay()

  setWorking(response)
  return response
}
