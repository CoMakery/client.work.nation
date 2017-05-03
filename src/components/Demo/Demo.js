import { d } from 'lightsaber/lib/log'
import React from 'react'

import Auth from '../../models/Authentication'

export default class Login extends React.Component {
  demoLogin = (event) => {
    const uportAddress = event.target.dataset.uport
    Auth.setCurrentUser({uportAddress})
    this.props.history.push('/home')
  }

  render() {
    return (
      <div className="login-buttons">
        <br />
        <div className="button expand" onClick={this.demoLogin} data-uport="0x75e9b52ac5fec235d8dcec5cb3d9623390c7eefd">
          Staging: Login as 0x75e9b52ac5fec235d8dcec5cb3d9623390c7eefd
        </div>
        <br />
        <br />
        <div className="button expand" onClick={this.demoLogin} data-uport="0xc0967d2f86d02d0c8b9ebb6de7dc00ef6f18f666">
          Staging: Login as 0xc0967d2f86d02d0c8b9ebb6de7dc00ef6f18f666
        </div>
        <br />
        <br />
        <div className="button expand" onClick={this.demoLogin} data-uport="0xe9e77f329190eb415e09050183b79c859572659b">
          Dev: Login as 0xe9e77f329190eb415e09050183b79c859572659b
        </div>
        <br />
        <br />
        <div className="button expand" onClick={this.demoLogin} data-uport="0x01d3b5eaa2e305a1553f0e2612353c94e597449e">
          Login as Harlan
        </div>
      </div>
    )
  }
}
