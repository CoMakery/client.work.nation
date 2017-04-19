import { d } from 'lightsaber/lib/log'
import React from 'react'

export default class Logout extends React.Component {
  componentWillMount() {
    if (this.props.currentUser) {
      this.props.history.push('/profile/' + this.props.currentUser)
    } else {
      this.props.history.push('/login')
    }
  }

  render() {
    return null
  }
}
