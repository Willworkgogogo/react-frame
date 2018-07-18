import React from 'react'
import { Route } from 'react-router-dom'
import TopicList from './topic-list/index'
import TopicDetail from './topic-detail/index'

export default class App extends React.Component {
  componentDidMount() {
    // do something here
  }

  render() {
    return [
      <Route path="/" component={TopicList} />,
      <Route path="/detail" component={TopicDetail} />,
    ]
  }
}
