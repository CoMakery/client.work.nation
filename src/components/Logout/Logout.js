import { d } from 'lightsaber/lib/log'
import React from 'react'

import Auth from '../../models/Authentication'

export default class Logout extends React.Component {
  componentWillMount() {
    Auth.logout()
    this.props.history.push('/')
  }

  render() {
    return null
  }
}
