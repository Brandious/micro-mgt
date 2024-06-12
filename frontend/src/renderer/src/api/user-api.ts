import { UserData, getActions } from '../store/user-store'

const { setUser, logout } = getActions()

export const signIn = async (payload: { username: string; password: string }) => {
  try {
    const response = (await window.api.login(payload)) as {
      status: number
      message: string
      user: UserData
    }

    setUser(response.user as UserData)
    return response.user
  } catch (err) {
    return {
      status: 401,
      message: 'Unauthorized'
    }
  }
}

export const userLogout = async () => {
  // const response = await window.api.logout()
  logout()
}
