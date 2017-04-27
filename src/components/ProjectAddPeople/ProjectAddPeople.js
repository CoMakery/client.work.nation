import {d} from 'lightsaber/lib/log'
import React from 'react'

import Auth from '../../models/Authentication'
import {Search} from '..'

export default class ProjectAddPeople extends React.Component {
  componentWillMount() {
    // TODO redirect unless current user is project owner
    Auth.redirectUnlessLoggedIn(this.props)
  }

  handleCancel = () => {
    this.props.history.push('/')
  }

  render() {
    if (!Auth.getCurrentUser()) return null

    return (
      <div className="project-container">
        <div className="project-header">
          <h2 className="">Project Setup</h2>
        </div>
        <div className="project-body">
          <div className="row project-body-row">
            <div className="small-8 columns">

              Search for more team members
              <Search />

              <div className="row">
                <div className="small-3 columns">candidate</div>
                <div className="small-2 columns">skill</div>
                <div className="small-2 columns">confirmations</div>
                <div className="small-2 columns"># of projects</div>
                <div className="small-3 columns">invite</div>
              </div>

              <div className="row">
                <div className="small-3 columns">
                  <img src="http://ipfs.io/ipfs/QmaMWaiwSVpMBBGihiHJ9N6FpM1QD9XiiyQSBCWJSEQ9md" />
                  Henry Thomas
                </div>
                <div className="small-2 columns">
                  <ul>
                    <li>Front End Design</li>
                    <li>Adobe Illustrator</li>
                    <li>SEO</li>
                  </ul>
                </div>
                <div className="small-2 columns">10</div>
                <div className="small-2 columns">4</div>
                <div className="small-3 columns">
                  <textarea placeholder="enter message here" />
                  [mail icon submit button]
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="project-footer">
          <input type="submit" onClick={this.handleCancel} value="no thanks" className="button button-lt-blue" />
        </div>
      </div>
    )
  }
}
