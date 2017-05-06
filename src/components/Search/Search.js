import {d} from 'lightsaber/lib/log'
import React from 'react'

import {SearchForPeople} from '..'
import Auth from '../../models/Authentication'

export default class Search extends React.Component {
  componentWillMount() {
    Auth.redirectUnlessLoggedIn(this.props)
  }

  render() {
    if (!Auth.getCurrentUser()) return null

    return <SearchForPeople
      title="Search"
      subtitle="Search for people by expertise"
    />
  }
}
