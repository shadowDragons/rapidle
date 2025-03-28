import { app, dialog, globalShortcut, ipcMain, IpcMainInvokeEvent } from 'electron'
import { config } from './db/query'
import { getByNameWindow } from './windows'

ipcMain.handle('shortCut', async (_event: IpcMainInvokeEvent, shortCut: string) => {
  if (!shortCut) {
    return true
  }
  return registerSearchShortCut(shortCut)
})

function registerSearchShortCut(shortCut: string) {
  globalShortcut.unregisterAll()
  if (!shortCut || typeof shortCut !== 'string') {
    dialog.showErrorBox('温馨提示', '快捷键格式不正确')
    return false
  }

  try {
    if (globalShortcut.isRegistered(shortCut)) {
      dialog.showErrorBox('温馨提示', '快捷键注册失败，请检查该快捷键是否已被其他程序占用')
      return false
    }

    const win = getByNameWindow('search')
    const registered = globalShortcut.register(shortCut, () => {
      if (win.isVisible()) {
        win.hide()
      } else {
        win.show()
        win.webContents.send('focus-input')
      }
    })

    if (!registered) {
      dialog.showErrorBox('温馨提示', '快捷键注册失败，请检查快捷键格式是否正确')
      return false
    }

    return true
  } catch (error) {
    console.error('Failed to register global shortcut:', error)
    dialog.showErrorBox('温馨提示', '快捷键注册失败，请检查快捷键格式是否正确')
    return false
  }
}

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})

export const registerAppGlobShortcut = async () => {
  try {
    const configData = await config()
    if (configData && configData.shortCut) {
      registerSearchShortCut(configData.shortCut)
    } else {
      console.warn('No valid shortcut found in config, using default')
      registerSearchShortCut('Alt+Space')
    }
  } catch (error) {
    console.error('Failed to register global shortcut:', error)
    registerSearchShortCut('Alt+Space')
  }
}
