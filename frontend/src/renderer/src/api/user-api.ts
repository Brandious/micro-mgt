
import { UserData, getActions } from '../store/user-store'
// import { z } from 'zod'

const { setUser, logout } = getActions()

export const signIn = async (payload: { username: string; password: string }) => {
  const response = (await window.api.login(payload)) as {
    status: string
    message: string
    user: UserData
  }

  setUser(response.user as UserData)
}

export const userLogout = async () => {
  // const response = await window.api.logout()
  logout()
}


