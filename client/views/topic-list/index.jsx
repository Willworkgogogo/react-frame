import React from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import AppState from '../../store/app-state'

@inject('appState')
@observer
export default class TopicList extends React.Component {
  changeName = (e) => {
    const { appState } = this.props
    appState.changeName(e.target.value)
  }

  bootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 3 // eslint-disabled-next
        resolve(true)
      });
    })
  }

  render() {
    const { appState } = this.props
    return (
      <div>
        <Helmet>
          <title>列表页</title>
          <meta name="description" content="这里是列表页的描述" />
        </Helmet>
        <input type="text" onChange={this.changeName} />
        <span>{appState.msg}</span>
      </div>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState)
}
