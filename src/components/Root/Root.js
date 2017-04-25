import { d } from 'lightsaber/lib/log'
import React from 'react'
import Nav from '../../util/nav'

export default class Root extends React.Component {
  componentWillMount() {
    Nav.redirectUnlessLoggedIn(this.props.currentUser)
    this.props.history.push('/home')
  }

  render() {
    return null
  }
}
