const path = require('path')
const fs = require('fs')
const child_process = require('child_process')

let electronDist = path.join(__dirname, '..', 'dist_electron')
if (!fs.existsSync(electronDist)) {
  fs.mkdirSync(electronDist)
}

let nodeModules = path.join(electronDist, 'node_modules')
if (!fs.existsSync(nodeModules)) {
  fs.mkdirSync(nodeModules)
}
child_process.execSync(`cp -r ${path.join(__dirname, '..', 'public_utools', 'node_modules')}/* ${nodeModules}`)
child_process.execSync(`cp -r ${path.join(__dirname, '..', 'public_electron', 'node_modules')}/* ${nodeModules}`)

child_process.execSync(`cp -r ${path.join(__dirname, '..', 'public_electron', 'preload-electron.js')} ${electronDist}/preload.js`)
child_process.execSync(`cp -r ${path.join(__dirname, '..', 'public', 'sites.js')} ${electronDist}`)
