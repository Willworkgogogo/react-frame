import React from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
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
      }, 1000);
      resolve(true)
    })
  }

  render() {
    const { appState } = this.props
    return (
      <div>
        <input type="text" onChange={this.changeName} />
        <span>{appState.msg}</span>
      </div>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState)
}
