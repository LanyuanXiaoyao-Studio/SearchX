const path = require('path')
const {batchDeleteFilesSync, listDirExcludeFiles} = require('./utils')

const root = path.join(__dirname, '..')

// 清理 public 文件夹
batchDeleteFilesSync(listDirExcludeFiles(path.join(root, 'public'), ['index.html', 'favicon.png']))

// 清理 dist 文件夹
batchDeleteFilesSync([
  path.join(root, 'dist'),
  path.join(root, 'dist_electron'),
  path.join(root, 'dist_utools'),
])
