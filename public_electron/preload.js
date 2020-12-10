require('./squirrel/squirrel-core-electron')

const {dialog, shell, clipboard} = require('electron').remote

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
window.readTextFromUrl = async url => (await phin(url)).body.toString()
window.openInBrowser = url => shell.openExternal(url)
window.copyText = text => clipboard.writeText(text)
