const express = require('express');
const ReactDomServer = require('react-dom/server');
const fs = require('fs');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const session = require('express-session');

const isDev = process.env.NODE_ENV === 'development'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'tid', // 设置cookie到浏览器端
  resave: false, // 重新生成cookie id
  saveUninitialized: false,
  secret: 'react cnode class', // 加密
}))

app.use(favicon(path.join(__dirname, '../', 'favicon.ico')))

app.use('/api/user', require('./util/handle-login'))
app.use('/api', require('./util/proxy'))

if (!isDev) {
  const serverEntry = require('../dist/server-entry').default;
  const tempalte = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
  app.use('/public', express.static(path.join(__dirname, '../dist')))
  app.get('*', function (req, res) {
    const appString = ReactDomServer.renderToString(serverEntry)
    let str = tempalte.replace('<!-- app -->', appString)
    res.send(str)
  })
} else {
  const devStatic = require('./util/dev-static');
  devStatic(app)
}

app.listen(3333, function() {
  console.log('server is listening at http://localhost:3333');
})
