import { d } from 'lightsaber/lib/log'
import React from 'react'

import UportUser from '../../models/UportUser'
import './Login.css'

export default class Login extends React.Component {
  componentDidMount() {
    this.uportLogin()
  }

  uportLogin = () => {
    UportUser.login()
    .then((credentials) => {
      if (credentials) {
        d('logged in:', credentials)
        this.props.history.push(`/profile/${credentials.address}`)
      }
    })
    .catch(error => console.error(error))
  }

  render() {
    return null
  }
}

// <form onSubmit={this.handleLogin}>
//  <input type="submit" value="Login with uPort" className="button" />
// </form>
