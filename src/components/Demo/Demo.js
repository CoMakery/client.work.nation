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
        <div className="button" onClick={this.demoLogin} data-uport="0xa778edb246f6def1c51e599c23e7c8f1d1493633">
            Login as 0xa778edb246f6def1c51e599c23e7c8f1d1493633
          </div>
        <hr />
        <div className="button" onClick={this.demoLogin} data-uport="0xa778edb246f6def1c51e599c23e7c8f1d1493633">
            Login as 0xa778edb246f6def1c51e599c23e7c8f1d1493633
          </div>
        <hr />
        <div className="button" onClick={this.demoLogin} data-uport="0xe9e77f329190eb415e09050183b79c859572659b">
            Login as 0xe9e77f329190eb415e09050183b79c859572659b
        </div>
        <hr />
        <div className="button" onClick={this.demoLogin} data-uport="0x01d3b5eaa2e305a1553f0e2612353c94e597449e">
          Login as Harlan
        </div>
      </div>
    )
  }
}
