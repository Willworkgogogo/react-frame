const axios = require('axios');
const webpack = require('webpack');
const MemoryFs = require('memory-fs');

const serverConfig = require('../../build/webpack.config.server');

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/index.html')
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}

const serverCompiler = webpack(serverConfig)
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
})

module.exports = function (app) {

  app.get('*', function (req, res) {
    
  })
}