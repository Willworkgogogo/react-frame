const express = require('express');
const ReactSSR = require('react-dom/server');
const serverEntry = require('../dist/server-entry').default;
const fs = require('fs');
const path = require('path');

const tempalte = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')

const app = express()

app.use('/public', express.static(path.join(__dirname, '../dist')))

app.get('*', function (req, res) {
  const appString = ReactSSR.renderToString(serverEntry)
  let str = tempalte.replace('<!-- app -->', appString)
  res.send(str)  
})

app.listen(3333, function() {
  console.log('server is listening at http://localhost:3333');
})