const path = require('path');

module.exports = {
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/'
  },
  module: {
    rules: [
      {
        enforce: 'pre', // 设置优先级，在编译前，先检测代码规范
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        query: {compact: false},
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      }
    ]
  }
}
