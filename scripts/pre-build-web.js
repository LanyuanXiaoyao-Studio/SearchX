const path = require('path')
const {batchDeleteFilesSync, listDirExcludeFiles} = require('./utils')

batchDeleteFilesSync(listDirExcludeFiles(path.join(__dirname, '..', 'public'), ['index.html', 'favicon.png']))
