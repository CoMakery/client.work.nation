import {d} from 'lightsaber/lib/log'
import React from 'react'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'

import UportUser from '../../models/UportUser'
import {Confirm, Home, Login, Logout, Profile, Project, Search} from '..'
import '../../../node_modules/foundation-sites/dist/css/foundation-flex.css'  // Foundation with FlexGrid: http://foundation.zurb.com/sites/docs/flex-grid.html
import './App.scss'

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
          <Link to="/"><h1>Work.nation</h1></Link>
          {this.menu()}
          <hr />
          {this.routes()}
        </div>
      </BrowserRouter>
    )
  }

  menu = () => {
    if (this.state.currentUser) {   // need to store this in state to get it to render properly
      return <ul className="menu vertical">
        <li><Link to={'/profile/' + this.state.currentUser}>[Avatar Image]</Link></li>
        <li><Link to="/confirm"><img src="/static/images/icon_confirm.png" /></Link></li>
        <li><Link to="/search"><img src="/static/images/icon_Search.png" /></Link></li>
        <li><Link to="/project"><img src="/static/images/icon_ProjSetup.png" /></Link></li>
        <li><Link to="/logout">[Logout Icon]</Link></li>
      </ul>
    } else {
      return <ul>
        <li><Link to="/login">[Blank Avatar Image]</Link></li>
      </ul>
    }
  }

  routes = () => {
    return <Switch>
      <Route exact path="/"
        render={(props) => <Home {...props} currentUser={this.state.currentUser} />}
      />
      <Route exact path="/login" component={Login} />
      <Route exact path="/profile/:uportAddress(0x[0-9a-fA-f]{40})"
        render={(props) => <Profile {...props} />}
      />
      <Route exact path="/confirm"
        render={(props) => <Confirm {...props} currentUser={this.state.currentUser} />}
      />
      <Route exact path="/search"
        render={(props) => <Search {...props} currentUser={this.state.currentUser} />}
      />
      <Route exact path="/project"
        render={(props) => <Project {...props} currentUser={this.state.currentUser} />}
      />
      <Route exact path="/logout" component={Logout} />
      <Route component={this.RouteNotFound} />
    </Switch>
  }
  // {/* <Route exact path="/claim" */}
  // {/* render={(props) => <ClaimSkill {...props} currentUser={this.state.currentUser} />} */}
  // {/* /> */}

  RouteNotFound = ({ location }) => (
    <div>
      <div className="callout alert">
        <h5>Nothing found at <code>{location.pathname}</code></h5>
      </div>
    </div>
  )
}

