import { d } from 'lightsaber/lib/log'
import React from 'react'

import Auth from '../../models/Authentication'
import {ClaimSkill, Profile} from '..'

export default class Home extends React.Component {

  componentWillMount() {
    Auth.redirectUnlessLoggedIn(this.props)
  }

  render() {
    if (!Auth.getCurrentUser()) return null

    return <div>
      <ClaimSkill {...this.props} />
      <Profile {...this.props} uportAddress={Auth.getUportAddress(this.props)} />
    </div>
  }
}

