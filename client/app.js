import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import App from './app.jsx'

const root = document.getElementById('root')
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    root,
  )
}

render(App)

if (module.hot) {
  // accept 接收两个参数，更新模块，更新后的回调
  module.hot.accept('./app.jsx', () => {
    const NextApp = require('./app.jsx').default // eslint-disable-line
    render(NextApp) // 将更新内容，重新渲染
  })
}
