import { d } from 'lightsaber/lib/log'
import React from 'react'

export default class Root extends React.Component {
  componentWillMount() {
    if (!this.props.currentUser) this.props.history.push('/login')
    this.props.history.push('/home')
  }

  render() {
    return null
  }
}
