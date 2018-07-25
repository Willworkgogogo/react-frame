const axios = require('axios')
const { baseUrl } = require('./config')

module.exports = function (req, res, next) {
  const path = req.path
  const user = req.session.user
  const needAccessToken = req.query.needAccessToken

  if (needAccessToken && user.accessToken) {
    res.status(401).send({
      success: false,
      msg: 'need login'
    })
  }

  const query = Object.assign({}, req.query)
  if (query.needAccessToken) delete query.needAccessToken

  axios(`${baseUrl}${path}`, {
    method: req.method,
    params: query,
    data: Object.assign({}, req.body, {
      asscesstoken: user.accessToken
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencode' // 兼容cnode部分接口类型不统一
    }
  })
  .then(resp => {
    if (resp.status === 200) {
      res.send(resp.data)
    }else {
      res.status(resp.status).send(resp.data)
    }
  })
  .catch(err => {
    if (err.response) {
      res.status(500).send(err.response.data)
    } else {
      res.status(500).send({
        success: false,
        msg: '未知错误'
      })
    }
  })
}