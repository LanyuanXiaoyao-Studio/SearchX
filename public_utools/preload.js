require('./squirrel/squirr-core-utools')

const fs = require('fs')

utools.onPluginReady(() => {
  let result = squirrel.fetch()
  if (result.code === 0) {
    console.log(result.data)
    squirrel.imports(result.data.sites)
  }
})
window.isFileExists = path => fs.existsSync(path)
window.singleFileSelect = () => {
  let paths = utools.showOpenDialog({
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
window.openInExternal = url =>  utools.shellOpenExternal(url)
window.copyText = text => utools.copyText(text)
