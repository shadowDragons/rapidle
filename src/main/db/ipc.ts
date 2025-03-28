import { IpcMainInvokeEvent } from 'electron/main'
import { dialog, ipcMain } from 'electron'
import * as query from './query'
import { initTable } from './tables'

ipcMain.handle(
  'sql',
  async (_event: IpcMainInvokeEvent, sql: string, type: SqlActionType, params = []) => {
    try {
      const result = await query[type](sql, params)
      return result
    } catch (error) {
      console.error('SQL错误：', error)
      throw error
    }
  }
)

ipcMain.handle('initTable', async () => {
  try {
    initTable()
  } catch (error) {
    console.error('SQL错误：', error)
    throw error
  }
})

ipcMain.handle('selectDatabaseDirectory', async () => {
  const res = await dialog.showOpenDialog({
    title: '选择目录',
    properties: ['openDirectory', 'createDirectory']
  })
  return res.canceled ? '' : res.filePaths[0]
})

ipcMain.on('initTable', () => {
  initTable()
})
