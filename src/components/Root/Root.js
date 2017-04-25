import { d } from 'lightsaber/lib/log'
import React from 'react'

import Auth from '../../models/Authentication'

export default class Root extends React.Component {
  componentWillMount() {
    Auth.redirectUnlessLoggedIn(this.props)
    this.props.history.push('/home')
  }

  render() {
    return null
  }
}
