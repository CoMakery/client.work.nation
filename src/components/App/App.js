import {d} from 'lightsaber/lib/log'
import React from 'react'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import MetaTags from 'react-meta-tags'

import Auth from '../../models/Authentication'
import {Confirm, Demo, Home, Login, Logout, Project, ProjectAddPeople, Root, Search} from '..'
import '../../../node_modules/foundation-sites/dist/css/foundation-flex.css'  // Foundation with FlexGrid: http://foundation.zurb.com/sites/docs/flex-grid.html
import './App.scss'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    Auth.setCurrentUserHandler(this.setCurrentUser)
    Auth.getCurrentUserHandler(this.getCurrentUser)

    this.state = {
      currentUser: Auth.getCurrentUser(),
      currentUserFromServer: {},
    }
  }

  setCurrentUser = (currentUser) => {
    this.setState({currentUser}) //, () => d(this.state))
  }

  setCurrentUserFromServer = (currentUserFromServer) => {
    this.setState({currentUserFromServer}) //, () => d('App', {state: this.state}))
  }

  getCurrentUser = () => {
    return this.state && this.state.currentUser
  }

  render() {
    return (
      <div>
        <MetaTags>
          <title>Work.nation</title>
          <meta id="meta-description" name="description" content="work.nation" />
          <meta id="og-title" property="og:title" content="Work.Nation" />
          <link rel="shortcut icon" type="image/png" href="/static/images/favicon.png" />
        </MetaTags>
        <BrowserRouter>
          <div className="page-wrapper">
            <div className="">
              {this.menu()}
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
      return <div className="float-right menu-outside">
        <div className="menu-inside">
          <ul className="menu-items">
            <CurrentUserAvatar currentUserFromServer={this.state.currentUserFromServer} />
            <li><Link to="/confirm"><img src="/static/images/icon_confirmed.svg" className="icon" /></Link></li>
            <li><Link to="/search"><img src="/static/images/icon_search.svg" className="icon" /></Link></li>
            <li><Link to="/project"><img src="/static/images/icon_rocket.svg" className="icon" /></Link></li>
            <li><Link to="/logout"><img src="/static/images/icon_logout.svg" className="icon-logout" /></Link></li>
          </ul>
        </div>
      </div>
    } else {
      return <div className="float-right">
        <ul>
          <li><Link to="/login"><img src="/static/images/icon_blank_avatar.svg" className="icon-blank-avatar" /></Link></li>
        </ul>
      </div>
    }
  }

  routes = () => {
    return <Switch>
      <Route exact path="/"
        render={(props) => <Root {...props} currentUser={this.state.currentUser} />}
      />
      <Route exact path="/demo" component={Demo} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/home"
        render={(props) => <Home {...props} currentUser={this.state.currentUser} setCurrentUserFromServerHandler={this.setCurrentUserFromServer} />}
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
      <Route exact path="/project_setup/:projectId(Qm[0-9a-zA-Z]{40,})"
        render={(props) => <ProjectAddPeople {...props} currentUser={this.state.currentUser} />}
      />
      <Route exact path="/logout" component={Logout} />
      <Route component={RouteNotFound} />
    </Switch>
  }

}

const RouteNotFound = ({ location }) => (
  <div>
    <div className="callout alert">
      <h5>Nothing found at <code>{location.pathname}</code></h5>
    </div>
  </div>
)

const CurrentUserAvatar = ({currentUserFromServer}) => {
  if (currentUserFromServer.avatarImageIpfsKey) {
    return <li>
      <Link to="/home">
        <img src={'//ipfs.io/ipfs/' + currentUserFromServer.avatarImageIpfsKey}
          className="profile-photo" />
      </Link>
    </li>
  } else {
    return <li>
      <Link to="/home">
        <img src="/static/images/icon_blank_avatar.svg" className="icon-blank-avatar" />
      </Link>
    </li>
  }
}
