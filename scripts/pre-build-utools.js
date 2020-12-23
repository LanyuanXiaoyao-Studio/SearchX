const path = require('path')
const {copyFilesSync} = require('./utils')

let publicPath = path.join(__dirname, '..', 'public')
let publicSourcePath = path.join(__dirname, '..', 'public_utools')

copyFilesSync(path.join(publicSourcePath, 'preload.js'), `${publicPath}/preload.js`)
copyFilesSync(path.join(publicSourcePath, 'plugin.json'), `${publicPath}/plugin.json`)
copyFilesSync(path.join(publicSourcePath, 'squirrel'), `${publicPath}/squirrel`)
