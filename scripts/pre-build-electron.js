const path = require('path')
const fs = require('fs')
const {copyFilesSync} = require('./utils')

let publicPath = path.join(__dirname, '..', 'public')
let publicSourcePath = path.join(__dirname, '..', 'public_electron')

let distPath = path.join(__dirname, '..', 'dist_electron')
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath)
}

copyFilesSync(path.join(publicSourcePath, 'preload.js'), `${publicPath}/preload.js`)
copyFilesSync(path.join(publicSourcePath, 'preload.js'), `${distPath}/preload.js`)

copyFilesSync(path.join(publicSourcePath, 'squirrel'), `${publicPath}/squirrel`)
copyFilesSync(path.join(publicSourcePath, 'squirrel'), `${distPath}/squirrel`)
