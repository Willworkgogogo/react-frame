import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'

import App from './views/app'
import AppState from './store/app-state'

const root = document.getElementById('root')

const state = window.__INITIAL__STATE__ // eslint-disable-line

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider appState={new AppState(state.appState)}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
}

render(App)

if (module.hot) {
  // accept 接收两个参数，更新模块，更新后的回调
  module.hot.accept('./views/app', () => {
    const NextApp = require('./app').default // eslint-disable-line
    render(NextApp) // 将更新内容，重新渲染
  })
}
