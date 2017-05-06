import {d} from 'lightsaber/lib/log'
import React from 'react'

import {SearchForPeople} from '..'
import Auth from '../../models/Authentication'

export default class ProjectAddPeople extends React.Component {
  componentWillMount() {
    Auth.redirectUnlessLoggedIn(this.props)
  }

  render() {
    if (!Auth.getCurrentUser()) return null

    return <SearchForPeople
      {...this.props}
      title="Project Setup"
      subtitle="Search for more team members"
      cancelButton="no thanks" />
  }
}
