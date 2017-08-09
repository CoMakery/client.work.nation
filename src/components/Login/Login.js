import { d } from 'lightsaber/lib/log'
import React from 'react'
import debug from 'debug'
import Auth from '../../models/Authentication'

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

  demoLogin = (event) => {
    const uportAddress = event.target.dataset.uport
    Auth.setCurrentUser({uportAddress})
    this.props.history.push('/home')
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
              <h3 className="tagline">build a global professional portfolio</h3>
              <h3 className="tagline">powered by the blockchain</h3>
              <h3 className="tagline-alert">&lt;demo prototype&gt;</h3>
            </div>
          </div>
          <div className="row">
            <div className="small-4 columns" />
            <div className="small-6 columns">
              <div className="row">
                <div className="small-12 medium-6 columns hero-action text-center">
                  <input type="submit" value="sign in with uPort" onClick={this.uportLogin}
                    className="button button-cyan yellow-text button-thin button-fullwidth" />
                  <div className="sign-up-link">
                    <a href="https://www.uport.me" className="sign-up-link">sign up for a uPort
                      account ></a>
                  </div>
                </div>
                <div className="small-12 medium-6 columns hero-action">
                  <div className="button button-lt-blue yellow-text button-thin button-fullwidth" onClick={this.demoLogin} data-uport="0xfdab345e368120a5ba99549c1f74371cd73cdb93">
                    login as a demo user
                  </div>
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
              <h4 className="description">Build your project based professional
                portfolio. Share your contributions and let others confirm them.
                Take them with you wherever you go.
              </h4>
            </div>
            <div className="small-5 columns">
              <h4 className="headline">For companies</h4>
              <h4 className="description">
              Create cool projects for the community. Appreciate the contributions of your
                people. Connect with smart talent beyond borders.
              </h4>
            </div>
            <div className="small-1 columns" />
          </div>
          <div className="row">
            <div className="small-12 columns text-center github">
              <a href="https://github.com/worknation/work.nation" target="_blank">
                <img src="/static/images/icon_github.svg"
                  className="icon-github" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="landing-video">
        <div className="video-container">
          <iframe width="900" height="515" src="https://www.youtube.com/embed/tyjEPdtH5pY" frameBorder="0" allowFullScreen />
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
                <h4>Get recognized for your contribution on projects.</h4>
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
                <h4>Build engaged and talented teams.</h4>
              </div>
            </div>
          </div>
          <div className="small-1 columns" />
        </div>
        <div className="row">
          <div className="small-12 columns text-center get-started-button">
            <a href="https://www.uport.me" target="_blank">
              <input type="submit" value="get your blockchain ID from uPort"
                className="button button-lt-blue yellow-text button-thin" />
            </a>
          </div>
        </div>
      </div>
      <div className="landing-about-us" >
        <div className="row">
          <div className="small-12 columns">
            <h2 className="headline">
              about:work.nation
            </h2>

            <h3>
              vision
            </h3>
            <p>
              work.nation aspires to take a first step in providing an open platform for anybody to enhance their
              employability by capturing, validating and sharing their professional portfolio.
            </p>

            <p>
              work.nation is an open source platform based on a blockchain architecture enabling everyone to
              <ul>
                <li>Set-up their professional identity</li>
                <li>Create and maintain their professional portfolio</li>
                <li>Validate their portfolio by a trusted peer network</li>
                <li>Share their portfolio across organizations and platforms</li>
                <li>Fully own and control their personal data</li>
              </ul>
            </p>

            <h3>
              status
            </h3>
            <p>
              work.nation is currently in a proof of concept (PoC) state.
              It demonstrates the fundamental feasibility and functionality of a portable professional
              portfolio utilizing a blockchain architecture. work.nation at its core allows the creation of claims
              (of contributions to projects) and confirmations (of these contributions) as signed claims, using
              <a target="_blank" href="https://www.uport.me/">&nbsp;uPort</a> +
              <a target="_blank" href="https://ipfs.io/">&nbsp;IPFS</a> +
              <a target="_blank" href="https://ethereum.org/">&nbsp;Ethereum</a>
              .
            </p>

            <h3>
              background
            </h3>
            <p>
              work.nation evolved from concepts outlined in
              <a target="_blank" href="https://www.slideshare.net/slideshow/embed_code/key/BPZO0crUSvTGcW">
                &nbsp;"When Work Is No Longer Work"
              </a> (Nov 2016) and
              <a target="_blank" href="https://www.fowcommunity.com/fowc-ebook">
                &nbsp;"21st Century World of Work: Reputation-Based Culture Powered by Blockchain Technology"
              </a> (Oct 2016) and the
              <a target="_blank" href="https://github.com/WebOfTrustInfo/rebooting-the-web-of-trust-fall2016/blob/master/final-documents/reputation-toolkit.pdf">
                &nbsp;"Portable Reputation Toolkit Use Cases"
              </a>
              &nbsp;whitepaper (Feb 2017), then took on a life of its own.
            </p>

            <h3>
              minimum viable product / ecosystem
            </h3>
            <p>
              The minimum viable product is an individual portable professional portfolio tied to an identity that can
              be utilized with any given organization. The ecosystem need this is expected to fill includes that of
              organizations performing agile talent search for rapid project staffing and that of individuals to
              create and document a history of professional contributions agnostic to the organizations they worked for.
            </p>

            <h3>
              stakeholders
            </h3>
            <p>
              Vocabulary is defined from the perspective of projects as the primary entity. Stakeholders include
              contributors and organizations (represented by project owners).
            </p>

            <h3>
              minimal user scenario
            </h3>
            <p>
              <i>A Professional Contributor</i> works for an <i>Organization</i> on a <i>Project</i> with a <i>Fellow Contributor</i>
              <ol>
                <li><i>Fellow Contributor</i> provide attestion of <i>Professional Contributor's</i> contribution on <i>Project 1</i></li>
                <li><i>Professional Contributor</i> provides attestion of <i>Fellow Contributor's</i> contribution on <i>Project 1</i></li>
                <li><i>Organization</i> uses attestations to determine staffing on <i>Project N</i></li>
                <li><i>Professional Contributor</i> and <i>Fellow Contributor</i> use attestations of contributor membership of <i>Project N</i> to determine which roles to accept</li>
                <li>external contributors use attestations of contributor membership of <i>Project N</i> to influence funding decisions</li>
                <li><i>Professional Contributor</i> may selectively reveal attestations to <i>Organization</i> and <i>Fellow Contributor</i></li>
              </ol>
            </p>

            <h3>
              credits
            </h3>
            <p>
              work.nation was initiated by
              <a target="_blank" href="https://www.cisco.com"> Cisco </a>
              (
              <a href="mailto:tolamber@cisco.com">Tom Lamberty </a>
              &
              <a href="mailto:gbarozzi@cisco.com"> Gianpaolo Barozzi</a>
              ) and co-developed by
              <a target="_blank" href="https://www.comakery.com"> CoMakery </a>
              (
              <a href="mailto:noah@comakery.com">Noah Thorp</a>, Harlan Wood, and Kathrine Olson
              )
              and
              <a target="_blank" href="https://www.consensys.net"> ConsenSys </a>
              (
              <a target="_blank" href="mailto:bgleim@gmail.com">Bill Gleim</a>
              )
              with support by
              <a target="_blank" href="http://www.iftf.org/blockchainfutureslab"> IFTF </a>
              (
              <a target="_blank" href="mailto:alex.voto@gmail.com">Alex Voto</a>
              ).
            </p>
          </div>
        </div>
      </div>
      <div className="landing-footer" />
    </div>
  }
}
