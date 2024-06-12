import Store from 'electron-store'

export const tokenStore = new Store()

export const saveTokens = (tokens: { accessToken: string; refreshToken: string }) => {
  tokenStore.set('tokens', tokens)
}

export const getTokens = () => {
  return tokenStore.get('tokens') as {
    accessToken: string
    refreshToken: string
  }
}

export const clearTokens = () => {
  tokenStore.delete('tokens')
}
