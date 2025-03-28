import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  shortCut: (shortCut: string) => {
    return ipcRenderer.invoke('shortCut', shortCut)
  },
  dbChange: (config: ConfigDataType) => {
    return ipcRenderer.invoke('dbChange', config)
  },
  setIgnoreMouseEvents: (ignore: boolean, options?: { forward: boolean }) => {
    ipcRenderer.send('setIgnoreMouseEvents', ignore, options)
  },
  openConfigWindow: () => {
    ipcRenderer.send('openConfigWindow')
  },
  sql: (sql: string, type: SqlActionType, params = {}) => {
    return ipcRenderer.invoke('sql', sql, type, params)
  },
  openWindow: (name: WindowNameType) => {
    ipcRenderer.send('openWindow', name)
  },
  closeWindow: (name: WindowNameType) => {
    ipcRenderer.send('closeWindow', name)
  },
  selectDatabaseDirectory: () => {
    return ipcRenderer.invoke('selectDatabaseDirectory')
  },
  setDatabaseDirectory: (path: string) => {
    ipcRenderer.send('setDatabaseDirectory', path)
  },
  initTable: () => {
    ipcRenderer.send('initTable')
  },
  openExternal: (url: string) => {
    ipcRenderer.invoke('openExternal', url)
  },
  getInstalledApps: (keyword: string) => {
    return ipcRenderer.invoke('getInstalledApps', keyword)
  },
  getPlatform: () => {
    return ipcRenderer.invoke('getPlatform')
  },
  launchApp: (exec: string) => {
    ipcRenderer.send('launchApp', exec)
  },
  getProcessList: (keyword: string) => {
    return ipcRenderer.invoke('getProcessList', keyword)
  },
  closeProcess: (processName: string) => {
    ipcRenderer.send('closeProcess', processName)
  },
  restartApp: () => ipcRenderer.send('restart-app')
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
