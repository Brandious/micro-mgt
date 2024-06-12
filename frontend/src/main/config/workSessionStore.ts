import Store from 'electron-store'

export const workStore = new Store()

export const saveSessionID = (sessionId: string) => {
  workStore.set('sessionId', sessionId)
}

export const getSessionID = () => {
  return workStore.get('sessionId') as string
}

export const clearSession = () => {
  workStore.delete('sessionId')
}
