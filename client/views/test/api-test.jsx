import React from 'react'
import axios from 'axios'

const ACCESS_TOKEN = '68d0eced-00ca-40c9-97fa-5f8366da781d'

/* eslint-disable */
export default class TestApi extends React.Component {
  getTopics() {
    axios.get('/api/topics').then(resp => {
      console.log(resp)
    })
  }

  login() {
    axios
      .post('/api/user/login', {
        accessToken: ACCESS_TOKEN
      })
      .then(resp => {
        console.log(resp)
      })
      .catch()
  }

  markAll() {
    axios.post('/api/message/mark_all?needAccessToken=true').then(resp => {
      console.log(resp)
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.getTopics}>topics</button>
        <button onClick={this.login}>login</button>
        <button onClick={this.markAll}>markAll</button>
      </div>
    )
  }
}
/* eslint-enable */
