const fs = require('fs')
const path = require('path')
const {batchCopyFilesSync, batchDeleteFilesSync, listDirExcludeFiles} = require('./utils')

batchDeleteFilesSync(listDirExcludeFiles(path.join(__dirname, '..', 'public'), ['index.html', 'favicon.png']))

let publicPath = path.join(__dirname, '..', 'public')
let publicSourcePath = path.join(__dirname, '..', 'public_utools')

let packageFile = fs.readFileSync(path.join(__dirname, '..', 'package.json'), {encoding: 'utf-8'})
let version = JSON.parse(packageFile)['version']
let pluginFile = JSON.stringify({
  'pluginName': 'SearchX (资源搜索)',
  'author': 'lanyuanxiaoyao',
  'homepage': 'https://github.com/LanyuanXiaoyao-Studio/SearchX',
  'description': '海纳百川, 搜遍天下',
  'version': version,
  'logo': 'logo.png',
  'main': 'index.html',
  'preload': 'preload.js',
  'pluginSetting': {
    'single': true,
    'height': 580,
  },
  'development': {
    'main': 'http://127.0.0.1:8080/index.html',
    'preload': './preload.js',
  },
  'features': [
    {
      'code': 'torrent',
      'explain': '资源搜索',
      'cmds': [
        'Torrent',
        'BT',
        '资源搜索',
        '种子搜索',
        'SearchX',
      ],
    },
  ],
})
fs.writeFileSync(`${publicPath}/plugin.json`, pluginFile)

batchCopyFilesSync([
  [path.join(publicSourcePath, 'preload.js'), `${publicPath}/preload.js`],
  [path.join(publicSourcePath, 'squirrel'), `${publicPath}/squirrel`],
  [path.join(publicSourcePath, 'node_modules'), `${publicPath}/node_modules`],

  [path.join(__dirname, '..', 'icons', 'icon.png'), `${publicPath}/logo.png`],
])
