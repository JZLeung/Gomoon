import { IpcRendererEvent, contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { SettingModel } from '../main/model/model'

// Custom APIs for renderer
export const api = {
  multiCopy: (callback: (event: IpcRendererEvent, msg: string) => void) => {
    ipcRenderer.on('multi-copy', callback)
    return () => {
      ipcRenderer.removeListener('multi-copy', callback)
    }
  },
  showWindow: (callback: (event: IpcRendererEvent) => void) => {
    ipcRenderer.on('show-window', callback)
    return () => {
      ipcRenderer.removeListener('show-window', callback)
    }
  },
  setIsOnTop: (isOnTop: boolean) => ipcRenderer.invoke('set-is-on-top', isOnTop),

  // 配置相关
  loadConfig: () => ipcRenderer.invoke('load-config'),
  setConfig: () => ipcRenderer.invoke('set-config'),
  setModels: (models: SettingModel['models']) => ipcRenderer.invoke('set-models', models)
} as const

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
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
