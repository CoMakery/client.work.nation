import { d } from 'lightsaber/lib/log'
import React from 'react'

import {ClaimSkill, Profile} from '..'

export default class Home extends React.Component {

  render() {
    return <div>
      <ClaimSkill {...this.props} />
      <Profile {...this.props} uportAddress={this.props.currentUser} />
    </div>
  }
}

