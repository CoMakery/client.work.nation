import {d} from 'lightsaber/lib/log'
import React from 'react'

import Auth from '../../models/Authentication'

export default class Search extends React.Component {

  componentWillMount() {
    Auth.redirectUnlessLoggedIn(this.props)
  }

  render() {
    return null
  }

}
