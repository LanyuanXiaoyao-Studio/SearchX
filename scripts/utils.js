const fs = require('fs')
const path = require('path')

const copyFilesSyncRecursive = (source, destination) => {
  if (!fs.existsSync(source)) {
    return
  }
  let stat = fs.statSync(source)
  if (!stat.isDirectory()) {
    fs.mkdirSync(path.parse(destination).dir, {
      recursive: true
    })
    fs.copyFileSync(source, destination)
  }
  else {
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination)
    }
    let names = fs.readdirSync(source)
    names.forEach(name => copyFilesSyncRecursive(path.join(source, name), path.join(destination, name)))
  }
}

const deleteFilesSyncRecursive = source => {
  if (!fs.existsSync(source)) {
    return
  }
  let stat = fs.statSync(source)
  if (!stat.isDirectory()) {
    fs.rmSync(source)
  }
  else {
    let names = fs.readdirSync(source)
    names.forEach(name => deleteFilesSyncRecursive(path.join(source, name)))
    fs.rmdirSync(source)
  }
}

module.exports = {
  copyFilesSync: (source, destination) => {
    console.log('copy: ', source, destination)
    copyFilesSyncRecursive(source, destination)
  },
  batchCopyFilesSync: pairs => {
    console.log('copy: ', pairs)
    pairs.forEach(pair => copyFilesSyncRecursive(pair[0], pair[1]))
  },
  deleteFilesSync: source => {
    console.log('delete: ', source)
    deleteFilesSyncRecursive(source)
  },
  batchDeleteFilesSync: paths => {
    console.log('delete: ', paths)
    paths.forEach(p => deleteFilesSyncRecursive(p))
  },
  listDirExcludeFiles: (source, names) => {
    let fileNames = fs.readdirSync(source)
    return fileNames.filter(n => names.indexOf(n) < 0)
                    .map(n => path.join(source, n))
  }
}

