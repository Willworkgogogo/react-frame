const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const HTMLPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'

const config = webpackMerge(baseConfig, {
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  plugins: [
    new HTMLPlugin({ // 生成一个html文件，并将output的js脚本自动引入
      template: path.join(__dirname, '../client/template.html') // 指定html文件
    })
  ]
})

if (isDev) {
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js')
    ]
  }
  config.devServer = {
    host: '0.0.0.0', // 更灵活的指代，可以使用127.0.0.1， localhost， 还可以使用本机ip链接
    port: '8888',
    contentBase: path.join(__dirname, '../dist'), // 告诉服务器从哪里读取内容
    hot: true, // 热更新
    overlay: {
      errors: true // 错误时才出现遮罩，提示错误信息
    },
    publicPath: '/public/', // 和webpack的路径统一
    historyApiFallback: {
      index: '/public/index.html' // 404返回的页面
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin()) // 这里启动模块热更新后，它的接口将暴露在module.hot下面
}

module.exports = config
