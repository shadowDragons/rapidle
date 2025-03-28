import { BrowserWindow, BrowserWindowConstructorOptions, shell } from 'electron'
import { resolve } from 'path'
import icon from '../../resources/icon.png?asset'
import { is } from '@electron-toolkit/utils'
import url from 'node:url'
export interface OptionsType extends Partial<BrowserWindowConstructorOptions> {
  openDevTools?: boolean
  hash?: string
  initShow?: boolean
}

export function createWindow(options: OptionsType): BrowserWindow {
  const preloadPath = resolve(__dirname, '../preload/index.js')

  const win = new BrowserWindow(
    Object.assign(
      {
        width: 500,
        height: 350,
        center: true,
        show: false,
        frame: false,
        transparent: true,
        alwaysOnTop: false,
        autoHideMenuBar: true,
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
          preload: preloadPath,
          sandbox: false,
          webSecurity: true
        }
      },
      options
    )
  )

  if (is.dev && options.openDevTools) {
    win.webContents.openDevTools({ mode: 'detach' })
  }

  win.on('ready-to-show', () => {
    options.initShow && win.show()
  })

  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL'] + options.hash)
  } else {
    win.loadURL(
      url.format({
        pathname: resolve(__dirname, '../renderer/index.html'),
        protocol: 'file',
        slashes: true,
        hash: options.hash?.substring(1)
      })
    )
  }

  return win
}
