import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { BrowserWindow, Menu, Tray, app, ipcMain, shell } from 'electron'
import { join } from 'path'
import icon from '../../resources/favicon/favicon-16x16.png?asset'
import { handleDialogOpen } from './components/dialog'
import { getUser, loginUser } from './services/auth/auth-service'
import { endDay, startDay } from './services/work/work-service'
import { getProjectById, getProjects } from './services/project/project-service'
import { getTeamById, getTeams } from './services/teams/team-service'
import { getUsers } from './services/users/user-service'
import { getTokens } from './config/tokenStore'

let tray: Tray | null = null
let mainWindow: BrowserWindow | null = null

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1125,
    height: 860,
    // minWidth: 900,
    // minHeight: 670,
    // maxHeight: 670,
    // maxWidth: 900,
    show: false,
    // frame: false,
    // titleBarStyle: 'hidden',
    // autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true
    },
    icon: join(__dirname, '../build/icon.ico')
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow && mainWindow.show()
    mainWindow && mainWindow.webContents.openDevTools()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  let isQuitting = false

  app.on('before-quit', () => {
    isQuitting = true
  })

  mainWindow!.on('close', (e) => {
    if (!isQuitting) {
      e.preventDefault()
      mainWindow && mainWindow.hide()
    }
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.micro-managment')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))
  // Dialog test
  ipcMain.handle('dialog:openDialog', handleDialogOpen)

  ipcMain.handle('api:login', (_, args) => loginUser(args))

  ipcMain.handle('api:getUser', () => getUser())

  ipcMain.handle('api:startDay', (_, args) => startDay(args))
  ipcMain.handle('api:endDay', () => endDay())

  ipcMain.handle('api:getUsers', () => getUsers())

  ipcMain.handle('api:getTeams', () => getTeams())
  ipcMain.handle('api:getTeamById', (_, args) => getTeamById(args))

  ipcMain.handle('api:getProjects', () => getProjects())
  ipcMain.handle('api:getProjectById', (_, args) => getProjectById(args))

  ipcMain.handle('auth:getTokens', () => getTokens())

  createTray()
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

const createTray = (): void => {
  tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open', click: () => mainWindow?.show() },
    { label: 'Website', click: () => shell.openExternal('https://www.electronjs.org') },
    {
      label: 'Quit',
      click: () => {
        mainWindow && mainWindow.close()
        app.quit()
      }
    }
  ])

  tray.setToolTip('Micro Managment | Online')
  tray.setContextMenu(contextMenu)
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit()
// })

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
