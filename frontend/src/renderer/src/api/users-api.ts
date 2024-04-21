import { UsersData, getActions } from '@renderer/store/users-store'

const { setUsers } = getActions()

const ipcRenderer = window.electron.ipcRenderer

export const getUsers = async () => {
  const response = (await ipcRenderer.invoke('api:getUsers')) as {
    id: string
    username: string
    email: string
    location: string
    roles: string[]
  }[]

  setUsers(response as UsersData[])
}
