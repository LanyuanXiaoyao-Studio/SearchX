const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MangleJsClassPlugin = require('mangle-js-webpack-plugin')
const path = require('path')

const appMode = process.env.VUE_APP_MODE
console.log(`Current Mode: ${appMode}`)
const isWeb = appMode === 'web'

let distPath = path.join(__dirname, 'dist')
if (appMode === 'utools') distPath = path.join(__dirname, 'dist_utools')

console.log(`Current Node Mode: ${process.env.NODE_ENV}`)
module.exports = {
  publicPath: isWeb ? '/' : './',
  productionSourceMap: false,
  outputDir: distPath,
  chainWebpack: config => {
    config.plugin('copy-plugin')
          .use(CopyPlugin, [{
            patterns: [
              {
                from: path.join(__dirname, 'README.md'),
                to: path.join(distPath, 'README.md'),
              }
            ],
          }])
    if (process.env.NODE_ENV === 'production') {
      config.optimization
            .minimizer('terser')
            .use(TerserPlugin, [{
              terserOptions: {
                compress: {
                  pure_funcs: ['console.log']
                }
              }
            }])
      config.plugin('mangle-plugin')
            .use(MangleJsClassPlugin, [{
              algorithm: 'obfuscator',
              algorithmConfig: {
                prefix: 'focus',
                log: false
              }
            }])
    }
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
          category: 'public.app-category.utilities',
          icon: 'icons/icon.icns',
          target: ['dmg', '7z', 'zip'],
          electronLanguages: ['en', 'zh_CN', 'zh_TW']
        },
        win: {
          icon: 'icons/icon.ico',
          target: ['nsis', 'portable']
        },
        nsis: {
          oneClick: false,
          perMachine: false,
          allowToChangeInstallationDirectory: true,
          installerIcon: 'icons/icon.ico',
          differentialPackage: false,
        },
        dmg: {
          writeUpdateInfo: false
        },
        linux: {
          icon: 'icons/icon.png',
          target: ['AppImage', 'deb', 'rpm'],
          category: 'Network'
        },
      }
    }
  }
}
