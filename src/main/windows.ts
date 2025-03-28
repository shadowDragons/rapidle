import { BrowserWindow, IpcMainEvent, IpcMainInvokeEvent } from 'electron'
import { createWindow, OptionsType } from './createWindow'

export const config = {
  search: {
    id: 0,
    options: {
      initShow: true,
      hash: '',
      openDevTools: false
    }
  },
  code: {
    id: 0,
    options: {
      initShow: false,
      openDevTools: false,
      width: 1060,
      height: 600,
      frame: true,
      transparent: false,
      hash: '/#config/category'
    }
  },
  config: {
    id: 0,
    options: {
      initShow: false,
      openDevTools: false,
      width: 505,
      height: 350,
      frame: true,
      transparent: false,
      hash: '/#config'
    }
  }
} as Record<WindowNameType, { id: number; options: OptionsType }>

export const getByNameWindow = (name: WindowNameType) => {
  let win = BrowserWindow.fromId(config[name].id)
  if (!win) {
    win = createWindow(config[name].options)
    config[name].id = win.id
  }
  return win
}

export const getWindowByEvent = (event: IpcMainEvent | IpcMainInvokeEvent) => {
  return BrowserWindow.fromWebContents(event.sender)!
}
