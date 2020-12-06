const fs = require('fs')
const path = require('path')

const copyFilesSyncRecursive = (source, destination) => {
  let stat = fs.statSync(source)
  if (!stat.isDirectory()) {
    fs.mkdirSync(path.parse(destination).dir, {
      recursive: true
    })
    fs.copyFileSync(source, destination)
  } else {
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination)
    }
    let names = fs.readdirSync(source)
    names.forEach(name => copyFilesSyncRecursive(path.join(source, name), path.join(destination, name)))
  }
}

module.exports = {
  copyFilesSync: (source, destination) => {
    console.log('copy: ', source, destination)
    copyFilesSyncRecursive(source, destination)
  }
}

