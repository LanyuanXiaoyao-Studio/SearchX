'use strict'
console.log('__dirname', __dirname)
import {app, BrowserWindow, protocol} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {VUEJS_DEVTOOLS} from 'electron-devtools-installer'
import path from 'path'

const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  {scheme: 'app', privileges: {secure: true, standard: true}}
])

let win

async function createWindow() {
  win = new BrowserWindow({
    width: 1080,
    height: 720,
    center: true,
    titleBarStyle: 'hidden',
    fullscreenWindowTitle: true,
    alwaysOnTop: false,
    autoHideMenuBar: true,
    webPreferences: {
      enableRemoteModule: true,
      preload: path.resolve(__dirname, 'preload.js'),
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
    }
  })
  win.setMenu(null)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
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
}

// app.on('window-all-closed', () => console.log('window-all-closed'))
app.on('before-quit', () => console.log('before-quit'))
app.on('quit', () => console.log('quit'))
app.on('will-quit', () => console.log('will-quit'))

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  console.log('ready')
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
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
