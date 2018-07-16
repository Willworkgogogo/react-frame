const path = require('path')

module.exports = {
  target: 'node', // 定义webpack编译内容的执行环境
  entry: {
    app: path.join(__dirname, '../client/server-entry.js')
  },
  output: {
    filename: 'server-entry.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public',
    libraryTarget: 'commonjs2'  // 因为后台使用nodejs，所以编译成commonjs规范
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        loader: 'babel-loader',
        query: { compact: false },
        exclude: [path.join(__dirname, '../node_modules')]
      }
    ]
  }
}
