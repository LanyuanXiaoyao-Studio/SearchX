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
}
