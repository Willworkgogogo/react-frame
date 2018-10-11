const router = require('express').Router()
const axios = require('axios')
const queryString = require('query-string')
const { baseUrl } = require('./config')

router.post('/login', function(req, res, next) {
  axios({
      url: `${baseUrl}/accesstoken`,
      method: req.method,
      data: queryString.stringify({accesstoken: req.body.accessToken}),
      headers: {
        'content-type': 'application/x-www-form-urlencoded' // 兼容cnode部分接口类型不统一
      }
    })
    .then(resp => {
      const { success, loginname, id, avatar_url } = resp.data
      if (resp.status === 200 && success) {
        // 将登陆信息存储到session里，便于下次登陆时可以直接读取
        req.session.user = {
          accessToken: req.body.accesstoken,
          loginName: loginname,
          id: id,
          avatarUrl: avatar_url
        }
        // 给浏览器端返回信息
        res.json({
          success: true,
          data: resp.data
        })
      }
    })
    .catch(err => {
      console.log('error : ', err);
      if (err.response) {
        res.json({
          success: false,
          data: err.message
        })
      } else {
        // 将错误抛给全局错误处理器处理
        next(err)
      }
    })
})

module.exports = router
