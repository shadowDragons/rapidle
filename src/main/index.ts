import { electronApp, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, ipcMain, session } from 'electron'
import './windows'
import './ipc'
import './db'
import { registerAppGlobShortcut } from './shortCut'
import { getByNameWindow } from './windows'
import path from 'node:path'
import { initDB } from './db/query'
import { initTable } from './db/tables'

let mainWindow: BrowserWindow | null = null

app.whenReady().then(() => {
  initDB()
  initTable()
  registerAppGlobShortcut()
  mainWindow = getByNameWindow('search')

  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) getByNameWindow('search')
  })
  if (process.platform === 'darwin') {
    app.dock.setIcon(path.resolve(__dirname, '../resources/icon.png'))
  }
  if (mainWindow) {
    mainWindow.once('ready-to-show', () => {
      mainWindow?.show()
      mainWindow?.webContents.send('focus-input')
    })
    mainWindow.on('restore', () => {
      mainWindow?.webContents.send('focus-input')
    })
    mainWindow.on('focus', () => {
      mainWindow?.webContents.send('focus-input')
    })
    mainWindow.on('closed', () => {
      mainWindow = null
    })
    mainWindow.on('hide', () => {
      mainWindow?.webContents.send('window-hidden')
    })
    mainWindow.on('blur', () => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.hide()
      }
    })
  }
})

app.on('ready', async () => {
  await session.defaultSession.clearCache()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
