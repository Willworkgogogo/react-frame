const axios = require('axios')
const queryString = require('query-string')
const { baseUrl } = require('./config')

const ACCESS_TOKEN = '3cc35c25-f8b7-4450-88e5-91672f41a207'

module.exports = function(req, res, next) {
  const path = req.path
  const user = req.session.user
  console.log(user);
  const needAccessToken = req.query.needAccessToken
  console.log('needAccessToken', needAccessToken);
  if (needAccessToken && !user.accessToken) {
    res.status(401).send({
      success: false,
      msg: 'need login'
    })
  }

  const query = Object.assign({}, req.query)
  if (query.needAccessToken) delete query.needAccessToken
  console.log('query', query);
  axios(`${baseUrl}${path}`, {
    method: req.method,
    params: query,
    data: queryString.stringify(
      Object.assign({}, req.body, {
        asscesstoken: ACCESS_TOKEN
      })
    ),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded' // 兼容cnode部分接口类型不统一
    }
  })
    .then(resp => {
      if (resp.status === 200) {
        res.send(resp.data)
      } else {
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
