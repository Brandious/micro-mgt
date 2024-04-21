import { useEffect } from 'react'
import io from 'socket.io-client'
const ipcRenderer = window.electron.ipcRenderer

export function useSocket(url: string, userId: string) {
  useEffect(() => {
    const connectToSocket = async () => {
      const tokens = await ipcRenderer.invoke('auth:getTokens')
      console.log(tokens)

      const socket = io(url, {
        extraHeaders: {
          authorization: `Bearer ${tokens.accessToken}`
        },
        query: {
          userId
        }
      })

      socket.on('connect', () => {
        console.log('Connected to Socket.IO server!')
      })

      // handle other socket events...

      return Promise.resolve(socket)
    }

    const socket = connectToSocket()

    return () => {
      socket.then((res) => res.disconnect())
      console.log('Disconnected from Socket.IO server!')
    }
  }, [url, userId])
}
