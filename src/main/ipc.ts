import { app, ipcMain, IpcMainEvent, shell } from 'electron'
import { getByNameWindow, getWindowByEvent } from './windows'
import {
  closeProcess,
  getInstalledApps,
  getPlatform,
  getProcessList,
  launchApp
} from './platformApps'

ipcMain.on('openWindow', (_event: IpcMainEvent, name: WindowNameType) => {
  getByNameWindow(name).show()
})

ipcMain.on('closeWindow', (_event: IpcMainEvent, name: WindowNameType) => {
  getByNameWindow(name).hide()
})

ipcMain.on(
  'setIgnoreMouseEvents',
  (event: IpcMainEvent, ignore: boolean, options?: { forward: boolean }) => {
    getWindowByEvent(event).setIgnoreMouseEvents(ignore, options)
  }
)

ipcMain.handle('openExternal', async (_, url: string) => {
  await shell.openExternal(url)
})

ipcMain.handle('getInstalledApps', async (_, keyword: string) => {
  return await getInstalledApps(keyword)
})

ipcMain.handle('getProcessList', async (_, keyword: string) => {
  return await getProcessList(keyword)
})

ipcMain.on('closeProcess', async (_, processName: string) => {
  closeProcess(processName)
})

ipcMain.handle('getPlatform', () => {
  return getPlatform()
})

ipcMain.on('launchApp', async (_, exec: string) => {
  launchApp(exec)
})

ipcMain.on('restart-app', () => {
  app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
  app.quit()
})
