import {d} from 'lightsaber/lib/log'
import React from 'react'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'

import Auth from '../../models/Authentication'
import {Confirm, Home, Login, Logout, Project, Root, Search} from '..'
import '../../../node_modules/foundation-sites/dist/css/foundation-flex.css'  // Foundation with FlexGrid: http://foundation.zurb.com/sites/docs/flex-grid.html
import './App.scss'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: Auth.getCurrentUser()
    }
    Auth.setCurrentUserHandler(this.setCurrentUser)
  }

  setCurrentUser = (currentUser) => {
    this.setState({currentUser}) //, () => d(this.state))
  }

  render() {
    return (
      <BrowserRouter>
        <div className="page-wrapper">
          <div className="row">
            <div className="small-8 columns">
              <h1 className="project-name">work.nation</h1>
              {this.routes()}
            </div>
            <div className="small-3 columns" />
            <div className="small-1 columns">{this.menu()}</div>
          </div>
        </div>
      </BrowserRouter>
    )
  }

  menu = () => {
    if (this.state.currentUser) {   // need to store this in state to get it to render properly
      return <ul className="menu vertical">
        <li><Link to="/home">[Avatar Image]</Link></li>
        <li><Link to="/confirm"><img src="/static/images/icon_confirmed.svg" /></Link></li>
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
        render={(props) => <Root {...props} currentUser={this.state.currentUser} />}
      />
      <Route exact path="/login" component={Login} />
      <Route exact path="/home"
        render={(props) => <Home {...props} currentUser={this.state.currentUser} />}
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

  RouteNotFound = ({ location }) => (
    <div>
      <div className="callout alert">
        <h5>Nothing found at <code>{location.pathname}</code></h5>
      </div>
    </div>
  )
}
