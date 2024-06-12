import { useEffect, useState } from 'react'
import io from 'socket.io-client'
const ipcRenderer = window.electron.ipcRenderer

export function useSocket(url: string, userId: string) {
  const [loading, setLoading] = useState<boolean>(false)
  
  useEffect(() => {
    if (!url) return console.error('URL is required')
    if (!userId) return console.error('User ID is required')

    const connectToSocket = async () => {
      setLoading(true)
      const tokens = await ipcRenderer.invoke('auth:getTokens')

      const socket = io(url, {
        extraHeaders: {
          authorization: `Bearer ${tokens.accessToken}`
        },
        query: {
          userId
        }
      })

      socket.on('connect', () => {
        setLoading(false)
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

  return { loading }
}
