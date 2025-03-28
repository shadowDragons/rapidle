import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      shortCut: (shortCut: string) => Promise<boolean>
      dbChange: (config: ConfigDataType) => void
      setIgnoreMouseEvents: (ignore: boolean, options?: { forward: boolean }) => void
      openConfigWindow: () => void
      sql: <T>(sql: string, type: SqlActionType, params?: Record<string, any>) => Promise<T>
      openWindow: (name: WindowNameType) => void
      closeWindow: (name: WindowNameType) => void
      selectDatabaseDirectory: () => Promise<string>
      setDatabaseDirectory: (path: string) => void
      initTable: () => void
      openExternal: (url: string) => void
      getInstalledApps: <T>(keyword: string) => Promise<T>
      launchApp: (exce: string) => void
      getProcessList: <T>(keyword: string) => Promise<T>
      closeProcess: (processName: string) => void
      getPlatform: () => Promise<string>
      restartApp: () => void
    }
  }
}
