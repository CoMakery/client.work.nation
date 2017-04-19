import {d} from 'lightsaber/lib/log'
import React from 'react'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'

import UportUser from '../../models/UportUser'
import {ClaimSkill, Home, Login, Logout, Profile, Projects} from '..'
import '../../../node_modules/foundation-sites/dist/css/foundation-flex.css'  // Foundation with FlexGrid: http://foundation.zurb.com/sites/docs/flex-grid.html
import './App.css'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: UportUser.getCurrentUser()  // uPort address of "logged in" user
    }
    UportUser.setCurrentUserHandler(this.setCurrentUser)
  }

  setCurrentUser = (currentUser) => {
    this.setState({currentUser}) //, () => d(this.state))
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <h1>Work.nation</h1>
          {this.menu()}
          <hr />
          {this.routes()}
        </div>
      </BrowserRouter>
    )
  }

  menu = () => {
    if (this.state.currentUser) {   // need to store this in state to get it to render properly
      return <ul>
        <li><Link to={'/profile/' + this.state.currentUser}>Profile</Link></li>
        <li><Link to={'/projects/' + this.state.currentUser}>Projects</Link></li>
        <li><Link to="/claim">Claim Skill</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    } else {
      return <ul>
        <li><Link to="/login">Login</Link></li>
      </ul>
    }
  }

  routes = () => {
    return <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/"
        render={(props) => <Home {...props} currentUser={this.state.currentUser} />}
      />
      <Route exact path="/claim"
        render={(props) => <ClaimSkill {...props} currentUser={this.state.currentUser} />}
      />
      <Route exact path="/profile/:uportAddress(0x[0-9a-fA-f]{40})"
        render={(props) => <Profile {...props} />}
      />
      <Route exact path="/projects/:uportAddress(0x[0-9a-fA-f]{40})"
        render={(props) => <Projects {...props} currentUser={this.state.currentUser} />}
      />
      <Route component={this.RouteNotFound} />
    </Switch>
  }

  RouteNotFound = ({ location }) => (
    <div>
      <div className="callout alert">
        <h5>Nothing found at <code>{location.pathname}</code></h5>
      </div>
    </div>
  )
}

