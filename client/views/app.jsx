import React from 'react'
import { Link } from 'react-router-dom'
import Routes from '../config/router'

export default class App extends React.Component {
  render() {
    return [
      <div key="1">
        <Link to="/">列表页</Link>
        <Link to="/list/detail">详情页</Link>
      </div>,
      <Routes key="2" />
    ]
  }
}
