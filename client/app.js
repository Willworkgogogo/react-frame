import React from 'react'
import ReactDOM from 'react-dom'
import App from './app.jsx'

ReactDOM.render(<App />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept('./app.jsx', () => {
    const NextApp = require('./app.jsx').default;
    ReactDOM.render(<NextApp />, document.getElementById('root'))
  })
}