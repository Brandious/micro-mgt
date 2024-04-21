import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  login: async (payload: { username: string; password: string }) => {
    return ipcRenderer.invoke('api:login', payload)
  },
  getUser: async () => {
    return ipcRenderer.invoke('api:getUser')
  },

  startDay: async (payload: { userId: string }) => {
    return ipcRenderer.invoke('api:startDay', payload)
  },

  endDay: async () => {
    return ipcRenderer.invoke('api:endDay')
  },

  getProjects: async () => {
    return ipcRenderer.invoke('api:getProjects')
  },

  getTeams: async () => {
    return ipcRenderer.invoke('api:getTeams')
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('electronComponents', {
      openDialog: () => ipcRenderer.invoke('dialog:openDialog')
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
