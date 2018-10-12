const path = require('path')
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');

module.exports = webpackMerge(baseConfig, {
  target: 'node', // 定义webpack编译内容的执行环境
  entry: {
    app: path.join(__dirname, '../client/server-entry.js')
  },
  externals: Object.keys(require('../package.json').dependencies),
  output: {
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2'  // 因为后台使用nodejs，所以编译成commonjs规范
  }
})
