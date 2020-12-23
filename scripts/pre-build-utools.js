const path = require('path')
const {batchCopyFilesSync, batchDeleteFilesSync, listDirExcludeFiles} = require('./utils')

batchDeleteFilesSync(listDirExcludeFiles(path.join(__dirname, '..', 'public'), ['index.html']))

let publicPath = path.join(__dirname, '..', 'public')
let publicSourcePath = path.join(__dirname, '..', 'public_utools')

batchCopyFilesSync([
    [path.join(publicSourcePath, 'preload.js'), `${publicPath}/preload.js`],
    [path.join(publicSourcePath, 'plugin.json'), `${publicPath}/plugin.json`],
    [path.join(publicSourcePath, 'squirrel'), `${publicPath}/squirrel`],
    [path.join(publicSourcePath, 'node_modules'), `${publicPath}/node_modules`],

    [path.join(__dirname, '..', 'icons', 'icon.png'), `${publicPath}/logo.png`],
])
