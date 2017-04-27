import { d } from 'lightsaber/lib/log'
import React from 'react'

import Auth from '../../models/Authentication'
import UportUser from '../../models/UportUser'

export default class Login extends React.Component {
  componentDidMount() {
    if (!process.env.REACT_APP_FAKE_LOGIN) this.uportLogin()
  }

  uportLogin = () => {
    UportUser.login()
    .then((credentials) => {
      if (credentials) {
        d('logged in:', credentials)
        this.props.history.push('/home')
      }
    })
    .catch(error => console.error(error))
  }

  demoLogin = (event) => {
    const uportAddress = event.target.dataset.uport
    Auth.setCurrentUser({uportAddress})
    this.props.history.push('/home')
  }

  render() {
    if (process.env.REACT_APP_FAKE_LOGIN) {
      return <div>
        <div className="button" onClick={this.demoLogin} data-uport="0x65c7eeec1884d7dc2773464d3feb4c42cf44b74b">
          Login as 0x65c7eeec1884d7dc2773464d3feb4c42cf44b74b
        </div>
        <hr />
        <div className="button" onClick={this.demoLogin} data-uport="0xa778edb246f6def1c51e599c23e7c8f1d1493633">
          Login as 0xa778edb246f6def1c51e599c23e7c8f1d1493633
        </div>
        <hr />
        <div className="button" onClick={this.demoLogin} data-uport="0x01d3b5eaa2e305a1553f0e2612353c94e597449e">
          Login as Harlan
        </div>
        <hr />
        <div className="button" onClick={this.demoLogin} data-uport="0x01532a9d8c6f591be493d85f90966df90dc7a5ac">
          Login as 0x01532a9d8c6f591be493d85f90966df90dc7a5ac
        </div>
      </div>
    } else {
      return null
    }
  }
}

// <form onSubmit={this.handleLogin}>
//  <input type="submit" value="Login with uPort" className="button" />
// </form>
