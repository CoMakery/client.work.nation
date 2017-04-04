import React from 'react'
import { Router, browserHistory, Route, IndexRoute } from 'react-router'

import App from '../App/App.js'
import ClaimSkill from '../ClaimSkill/ClaimSkill.js'

const Routes =
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={ClaimSkill} />
    </Route>
  </Router>

export default Routes
