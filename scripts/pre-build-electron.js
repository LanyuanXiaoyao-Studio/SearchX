const path = require('path')
const fs = require('fs')
const {batchCopyFilesSync, batchDeleteFilesSync, listDirExcludeFiles} = require('./utils')

batchDeleteFilesSync(listDirExcludeFiles(path.join(__dirname, '..', 'public'), ['index.html', 'favicon.png']))

let publicPath = path.join(__dirname, '..', 'public')
let publicSourcePath = path.join(__dirname, '..', 'public_electron')

let distPath = path.join(__dirname, '..', 'dist_electron')
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath)
}

batchCopyFilesSync([
  [path.join(publicSourcePath, 'preload.js'), `${publicPath}/preload.js`],
  [path.join(publicSourcePath, 'preload.js'), `${distPath}/preload.js`],
  [path.join(publicSourcePath, 'squirrel'), `${publicPath}/squirrel`],
  [path.join(publicSourcePath, 'squirrel'), `${distPath}/squirrel`]
])
