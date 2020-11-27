// Node native http/https downloader
const agent = require('https-proxy-agent')
const phin = require('phin')
const iconv = require('iconv-lite')

window.nodeDownload = async (url, headers, proxy, charset) => {
  headers = JSON.parse(headers)
  let options = {
    url: url,
    core: {
      headers: headers
    }
  }
  if (proxy && proxy !== '') {
    options.core.agent = new agent(`${proxy}`)
  }
  let response = await phin(options)
  if (response && response.body) {
    return iconv.decode(response.body, charset)
  }
  return ''
}

const {BrowserWindow} = require('electron').remote

let browser = new BrowserWindow({
  width: 800,
  height: 600,
  show: false,
  webPreferences: {
    images: false,
    nodeIntegration: false,
    nodeIntegrationInWorker: false,
    sandbox: true,
  }
})
window.browserDownload = async (url, headers, proxy, charset) => {
  console.log(url, headers, proxy, charset)
  if (proxy && proxy !== '') {
    await browser.webContents.session.setProxy({
      proxyRules: proxy
    })
  }
  await browser.loadURL(url, {
    extraHeaders: headers
  })
  return await browser.webContents.executeJavaScript('function page() {return `<html>${document.documentElement.innerHTML}</html>`};page()')
}

const app = require('electron').remote.app
const path = require('path')
const fs = require('fs')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

let appDataPath = app.getPath('appData')
let databasePath = path.join(appDataPath, 'com.lanyuanxiaoyao.search')
let databaseFilePath = path.join(databasePath, 'database.json')
if (!fs.existsSync(databasePath)) {
  fs.mkdirSync(databasePath, {recursive: true})
}
let adapter = new FileSync(databaseFilePath)
let db = low(adapter)
db.defaults({
  data: ''
})
  .write()

window.get = () => {
  let data = db.get('data')
               .value()
  console.log(data)
  return data
}

window.put = data => {
  console.log(data)
  try {
    db.set('data', data)
      .write()
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

window.squirrelInitialReady = () => {
  let result = squirrel.fetch()
  if (result.code === 0) {
    let settings = result.data
    console.log(settings)
    squirrel.imports(settings.sites)
  }
}

window.isFileExists = path => fs.existsSync(path)

const dialog = require('electron').remote.dialog
window.singleFileSelect = () => {
  let paths = dialog.showOpenDialogSync({
    properties: ['openFile'],
    filters: [
      {name: 'JSON File', extensions: ['json']}
    ]
  })
  if (paths && paths.length > 0) {
    return paths[0]
  }
  return ''
}

window.readTextFromFile = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, {encoding: 'utf8'}, (error, data) => {
      if (error) {
        reject(error)
      }
      resolve(data)
    })
  })
}

window.readTextFromUrl = async url => (await phin(url)).body.toString()

const shell = require('electron').remote.shell

window.openInBrowser = url => shell.openExternal(url)

const clipboard = require('electron').remote.clipboard

window.copyText = text => clipboard.writeText(text)
