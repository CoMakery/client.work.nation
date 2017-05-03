import { d } from 'lightsaber/lib/log'
import React from 'react'
import debug from 'debug'

import UportUser from '../../models/UportUser'

const error = debug('wn:error')

export default class Login extends React.Component {
  uportLogin = () => {
    if (process.env.REACT_APP_FAKE_LOGIN) {
      this.props.history.push('/demo')
    } else {
      UportUser.login()
      .then((credentials) => {
        if (credentials) {
          d('logged in:', credentials)
          this.props.history.push('/home')
        }
      }).catch(err => error(err))
    }
  }

  render() {
    return <div>
      <div className="landing-container">
        <div className="landing-hero">
          <div className="row">
            <div className="small-2 columns" />
            <div className="small-10 columns">
              <h1 className="project-title">work.nation</h1>
            </div>
          </div>
          <div className="row">
            <div className="small-4 columns" />
            <div className="small-8 columns">
              <h3 className="tagline">build a global reputation</h3>
              <h3 className="tagline">powered by the blockchain</h3>
            </div>
          </div>
          <div className="row">
            <div className="small-4 columns" />
            <div className="small-6 columns">
              <div className="row">
                <div className="small-6 columns hero-action text-center">
                  <input type="submit" value="sign in with uPort" onClick={this.uportLogin}
                    className="button button-cyan yellow-text button-thin button-fullwidth" />
                  <div className="sign-up-link">
                    <a href="#" className="sign-up-link">sign up for a uPort
                      account ></a>
                  </div>
                </div>
                <div className="small-6 columns hero-action">
                  <input type="submit" value="browse projects"
                    className="button button-lt-blue yellow-text button-thin button-fullwidth" />
                </div>
              </div>
            </div>
            <div className="small-2 columns" />
          </div>
        </div>
        <div className="landing-for-who">
          <div className="row">
            <div className="small-1 columns" />
            <div className="small-5 columns">
              <div className="vert-bottom-outside">
                <div className="vert-bottom-inside">
                  <img src="/static/images/landing_page-for_individuals.svg"
                    className="icon-for-individuals" />
                </div>
              </div>
            </div>
            <div className="small-5 columns">
              <div className="vert-bottom-outside">
                <div className="vert-bottom-inside">
                  <img src="/static/images/landing_page-for_companies.svg"
                    className="icon-for-companies" />
                </div>
              </div>
            </div>
            <div className="small-1 columns" />
          </div>
          <div className="row">
            <div className="small-1 columns" />
            <div className="small-5 columns">
              <h4 className="headline">For indviduals</h4>
              <h4 className="description">Build your project based reputation.
                Take your reputation with you to new organizations. Find cool
                projects.</h4>
            </div>
            <div className="small-5 columns">
              <h4 className="headline">For companies</h4>
              <h4 className="description">Find talented and motivated people.
                Discover the capacity of your teams. Reach your organizational
                potential.</h4>
            </div>
            <div className="small-1 columns" />
          </div>
          <div className="row">
            <div className="small-12 columns text-center github">
              <img src="/static/images/icon_github.svg"
                className="icon-github" />
            </div>
          </div>
        </div>
      </div>
      <div className="landing-video">
        <div className="video-container">
          <h3 className="intro-video">introductory video</h3>
        </div>
      </div>
      <div className="landing-get-started">
        <h3 className="text-center">Get Started</h3>
        <div className="row">
          <div className="small-1 columns" />
          <div className="small-10 columns no-padding">
            <div className="row">
              <div className="small-1 columns text-right">
                <h2>1</h2>
              </div>
              <div className="small-3 columns no-padding">
                <h4>Get recognized for the skill you use on projects.</h4>
              </div>
              <div className="small-1 columns text-right">
                <h2>2</h2>
              </div>
              <div className="small-3 columns no-padding">
                <h4>Search your network of trusted collaborators.</h4>
              </div>
              <div className="small-1 columns text-right">
                <h2>3</h2>
              </div>
              <div className="small-3 columns no-padding">
                <h4>Build engaged talented teams.</h4>
              </div>
            </div>
          </div>
          <div className="small-1 columns" />
        </div>
        <div className="row">
          <div className="small-12 columns text-center get-started-button">
            <input type="submit" value="get your blockchain ID from uPort"
              className="button button-lt-blue yellow-text button-thin" />
          </div>
        </div>
      </div>
      <div className="landing-footer text-center">
        [footer]
      </div>
    </div>
  }
}
