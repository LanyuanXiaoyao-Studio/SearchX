const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

const appMode = process.env.VUE_APP_MODE
console.log(`Current Mode: ${appMode}`)
const isWeb = appMode === 'web'

let distPath = path.join(__dirname, 'dist')
if (appMode === 'utools') distPath = path.join(__dirname, 'dist_utools')

module.exports = {
  publicPath: isWeb ? '/' : './',
  productionSourceMap: false,
  outputDir: distPath,
  chainWebpack: config => {
    config.plugin('copy-plugin')
          .use(CopyPlugin, [
            {
              patterns: [
                {
                  from: path.join(__dirname, 'README.md'),
                  to: path.join(distPath, 'README.md'),
                }
              ],
            }
          ])
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'com.lanyuanxiaoyao.searchx',
        files: [
          '**/*',
          {
            from: 'node_modules',
            to: 'node_modules',
            filter: [
              '**/*'
            ]
          }
        ],
        mac: {
          icon: 'icons/icon.icns',
          target: ['dmg', 'pkg', '7z', 'zip']
        },
        win: {
          icon: 'icons/icon.ico',
          target: ['nsis', 'portable', 'msi', '7z', 'zip']
        },
        nsis: {
          oneClick: false,
          perMachine: false,
          allowToChangeInstallationDirectory: true,
          installerIcon: 'icons/icon.ico',
        }
      }
    }
  }
}
