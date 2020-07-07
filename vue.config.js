const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  publicPath: '/',
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugin('copy-plugin')
          .use(CopyPlugin, [
            {
              patterns: [
                {
                  from: path.join(__dirname, 'README.md'),
                  to: path.join(__dirname, 'dist', 'README.md'),
                }
              ],
            }
          ])
  },
}
