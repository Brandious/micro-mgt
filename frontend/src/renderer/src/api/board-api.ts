import { getActions } from '@renderer/store/board-store'

const ipcRenderer = window.electron.ipcRenderer

const { setBoard, setBoardById } = getActions()

export const getBoards = async () => {
  const response = (await ipcRenderer.invoke('api:getBoard')) as {
    status: number
    message: string
    boards: any
  }

  console.log('BoardRESPONSE', response)
  setBoard(response.boards as any)
}

export const getBoardIssuesById = async (id: string) => {
  const response = (await ipcRenderer.invoke('api:getBoardIssuesById', { id: id })) as {
    status: 200
    message: 'Success'
    boardIssues: any
  }

  console.log('BoardRESPONSEID', response)

  setBoardById(response.boardIssues as any)
}

export const assignTeamToProject = async (payload: { projectId: string; teamId: string }) => {
  const response = (await ipcRenderer.invoke('api:assignBoardToProject', payload)) as {
    status: number
  }

  console.log('assingmentRes', response)
  return response
}
