import {d} from 'lightsaber/lib/log'
import React from 'react'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import MetaTags from 'react-meta-tags'

import Auth from '../../models/Authentication'
import {Confirm, Home, Login, Logout, Project, ProjectAddPeople, Root} from '..'
import '../../../node_modules/foundation-sites/dist/css/foundation-flex.css'  // Foundation with FlexGrid: http://foundation.zurb.com/sites/docs/flex-grid.html
import './App.scss'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    Auth.setCurrentUserHandler(this.setCurrentUser)
    Auth.getCurrentUserHandler(this.getCurrentUser)

    this.state = {
      currentUser: Auth.getCurrentUser()
    }
  }

  setCurrentUser = (currentUser) => {
    this.setState({currentUser}) //, () => d(this.state))
  }

  getCurrentUser = () => {
    return this.state && this.state.currentUser
  }

  render() {
    return (
      <div>
        <MetaTags>
          <title>work.nation</title>
          <meta id="meta-description" name="description" content="work.nation" />
          <meta id="og-title" property="og:title" content="Work.Nation" />
          <link rel="shortcut icon" type="image/png" href="/static/images/favicon.png" />
        </MetaTags>
        <BrowserRouter>
          <div className="page-wrapper">
            <div className="float-right menu-outside">
              <div className="menu-inside">
                {this.menu()}
              </div>
            </div>
            <div className="">
              {this.routes()}
            </div>
          </div>
        </BrowserRouter>
      </div>
    )
  }

  menu = () => {
    if (this.state.currentUser) {   // need to store this in state to get it to render properly
      return <ul className="menu-items">
        <li><Link to="/home"><img src="/static/images/profile-photo.png" /></Link></li>
        <li><Link to="/confirm"><img src="/static/images/icon_confirmed.svg" /></Link></li>
        <li><Link to="/search"><img src="/static/images/icon_search.svg" /></Link></li>
        <li><Link to="/project"><img src="/static/images/icon_rocket.svg" /></Link></li>
        <li><Link to="/logout"><span className="tiny">[Logout]</span></Link></li>
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
        render={null}
      />
      <Route exact path="/project"
        render={(props) => <Project {...props} currentUser={this.state.currentUser} />}
      />
      <Route exact path="/project_setup/:projectId(Qm[0-9a-zA-Z]{40,})"
        render={(props) => <ProjectAddPeople {...props} currentUser={this.state.currentUser} />}
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
