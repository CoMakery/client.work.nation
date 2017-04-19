import { d } from 'lightsaber/lib/log'
import React from 'react'

import UportUser from '../../models/UportUser'

export default class Logout extends React.Component {
  componentWillMount() {
    UportUser.logout()
    this.props.history.push('/')
  }

  render() {
    return null
  }
}
