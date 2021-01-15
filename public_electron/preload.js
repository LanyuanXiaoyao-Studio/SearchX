require('./squirrel/squirrel-core-electron')

const {dialog, shell, clipboard, Notification} = require('electron').remote
const fs = require('fs')

window.download = async url => {
  return await window.nodeDownload(url, '{}', '', 'utf8')
}
window.squirrelInitialReady = async () => {
  let result = await squirrel.fetch()
  if (result.code === 0) {
    // console.log('squirrelInitialReady', result)
    await squirrel.imports(result.data.sites)
  }
}
window.isFileExists = path => fs.existsSync(path)
window.singleFileSelect = () => {
  let paths = dialog.showOpenDialogSync({
    properties: ['openFile'],
    filters: [{name: 'JSON File', extensions: ['json']}]
  })
  if (paths && paths.length > 0) return paths[0]
  return ''
}
window.readTextFromFile = path => {
  return new Promise((resolve, reject) =>
      fs.readFile(path, {encoding: 'utf8'}, (error, data) => {
        if (error) reject(error)
        resolve(data)
      })
  )
}
const http = url => url.indexOf('https') === 0 ? require('https') : require('http')
window.readTextFromUrl = url => {
  return new Promise((resolve, reject) => {
    // console.log(url, url.indexOf('https'), http(url))
    let request = http(url)
        .get(url, response => {
          let result = ''
          response.on('data', data => result += data)
          response.on('end', () => resolve(result))
        })
    request.on('error', e => reject(e))
  })
}
window.openInExternal = url => shell.openExternal(url)
window.copyText = async text => clipboard.writeText(text)
window.notify = (text, callback) => {
  if (Notification.isSupported()) {
    let notification = new Notification({
      title: 'SearchX',
      body: text,
      silent: true,
    })
    notification.show()
    notification.on('click', () => {
      if (callback) {
        callback()
      }
    })
  }
}
