require('./squirrel/squirrel-core-electron')

const {dialog, shell, clipboard} = require('electron').remote
const fs = require('fs')

window.squirrelInitialReady = () => {
  let result = squirrel.fetch()
  if (result.code === 0) {
    console.log(result.data)
    squirrel.imports(result.data.sites)
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
    console.log(url, url.indexOf('https'), http(url))
    let request = http(url)
        .get(url, response => {
          let result = ''
          response.on('data', data => result += data)
          response.on('end', () => resolve(result))
        })
    request.on('error', e => reject(e))
  })
}
window.openInExternal = url =>  shell.openExternal(url)
window.copyText = text => clipboard.writeText(text)
