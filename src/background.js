'use strict'
import {app, BrowserWindow, Menu, protocol} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {VUEJS_DEVTOOLS} from 'electron-devtools-installer'
import path from 'path'

const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  {scheme: 'app', privileges: {secure: true, standard: true}}
])

app.setName(process.env.VUE_APP_TITLE)
if (process.platform === 'linux') {
  app.disableHardwareAcceleration()
}

let win

async function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 700,
    center: true,
    titleBarStyle: 'hidden',
    fullscreenWindowTitle: true,
    alwaysOnTop: false,
    autoHideMenuBar: true,
    webPreferences: {
      enableRemoteModule: true,
      contextIsolation: false,
      preload: path.resolve(__dirname, 'preload.js'),
    }
  })
  win.setMenu(null)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    // 自动打开调试界面
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  }
  else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  // win.webContents.on('devtools-opened', () => {
  //   process.env.IS_TEST || win.webContents.closeDevTools()
  // })
  // 关闭主窗口直接退出程序
  win.on('closed', () => app.quit())
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  // console.log('ready')
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }

  // 菜单
  let appMenuTemplate = []
  if (process.platform === 'darwin') {
    appMenuTemplate.push({
      label: app.getName(),
      submenu: [
        {
          label: `关于 ${app.getName()}`,
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          label: '服务',
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          label: `隐藏 ${app.getName()}`,
          accelerator: 'cmd+H',
          role: 'hide'
        },
        {
          type: 'separator'
        },
        {
          label: '退出',
          accelerator: 'cmd+Q',
          click() {
            app.quit()
          }
        }
      ]
    })
    appMenuTemplate.push({
      label: '编辑',
      submenu: [
        {label: '撤销', role: 'undo'},
        {label: '重做', role: 'redo'},
        {type: 'separator'},
        {label: '剪切', role: 'cut'},
        {label: '复制', role: 'copy'},
        {label: '粘贴', role: 'paste'},
        {label: '粘贴并匹配样式', role: 'pasteandmatchstyle'},
        {label: '删除', role: 'delete'},
        {label: '全选', role: 'selectall'}
      ]
    })
  }
  let appMenus = Menu.buildFromTemplate(appMenuTemplate)
  Menu.setApplicationMenu(appMenus)

  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  }
  else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
