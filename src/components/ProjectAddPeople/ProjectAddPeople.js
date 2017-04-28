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
      <div className="row">
        <div className="small-8 columns">
          <div className="claim-skill-container">
            <h1 className="project-name">work.nation</h1>
          </div>
          <div className="project-container">
            <div className="project-header">
              <h2 className="">Project Setup</h2>
            </div>
            <div className="project-body">
              <div className="project-body-subheader">
                <div className="row">
                  <div className="small-6 columns">
                    <h3>Search for more team members</h3>
                    <div className="skill-search">
                      <Search />
                    </div>
                  </div>
                  <div className="small-6 columns" />
                </div>
              </div>
              <div className="project-body-list">
                <div className="project-body-list-subheader">
                  <div className="row">
                    <div className="small-3 columns">candidate</div>
                    <div className="small-3 columns">skill</div>
                    <div className="small-1 columns text-center">confirmations</div>
                    <div className="small-2 columns text-center"># of projects</div>
                    <div className="small-3 columns">invite</div>
                  </div>
                </div>
                <div className="project-body-list-scroll">
                  <div className="project-body-list-row">
                    <div className="row">
                      <div className="small-3 columns">
                        <img src="http://ipfs.io/ipfs/QmaMWaiwSVpMBBGihiHJ9N6FpM1QD9XiiyQSBCWJSEQ9md" className="profile-photo" />
                        <span className="name">Henry Thomas</span>
                      </div>
                      <div className="small-3 columns">
                        <ul className="skills">
                          <li>Front End Design</li>
                          <li>Adobe Illustrator</li>
                          <li>SEO</li>
                        </ul>
                      </div>
                      <div className="small-1 columns text-center">
                        <ul className="confirmation-count">
                          <li>10</li>
                          <li>3</li>
                          <li>2</li>
                        </ul>
                      </div>
                      <div className="small-2 columns text-center">
                        <ul className="project-count">
                          <li>4</li>
                          <li>3</li>
                          <li>1</li>
                        </ul>
                      </div>
                      <div className="small-3 columns text-right">
                        <textarea placeholder="enter message here" />
                        <img className="icon-message" src="/static/images/icon_message.svg" />
                      </div>
                    </div>
                  </div>
                  <div className="project-body-list-row">
                    <div className="row">
                      <div className="small-3 columns">
                        <img src="http://ipfs.io/ipfs/QmaMWaiwSVpMBBGihiHJ9N6FpM1QD9XiiyQSBCWJSEQ9md" className="profile-photo" />
                        <span className="name">Henry Thomas</span>
                      </div>
                      <div className="small-3 columns">
                        <ul className="skills">
                          <li>Front End Design</li>
                          <li>Adobe Illustrator</li>
                          <li>SEO</li>
                        </ul>
                      </div>
                      <div className="small-1 columns text-center">
                        <ul className="confirmation-count">
                          <li>10</li>
                          <li>3</li>
                          <li>2</li>
                        </ul>
                      </div>
                      <div className="small-2 columns text-center">
                        <ul className="project-count">
                          <li>4</li>
                          <li>3</li>
                          <li>1</li>
                        </ul>
                      </div>
                      <div className="small-3 columns text-right">
                        <textarea placeholder="enter message here" />
                        <img className="icon-message" src="/static/images/icon_message.svg" />
                      </div>
                    </div>
                  </div>
                  <div className="project-body-list-row">
                    <div className="row">
                      <div className="small-3 columns">
                        <img src="http://ipfs.io/ipfs/QmaMWaiwSVpMBBGihiHJ9N6FpM1QD9XiiyQSBCWJSEQ9md" className="profile-photo" />
                        <span className="name">Henry Thomas</span>
                      </div>
                      <div className="small-3 columns">
                        <ul className="skills">
                          <li>Front End Design</li>
                          <li>Adobe Illustrator</li>
                          <li>SEO</li>
                        </ul>
                      </div>
                      <div className="small-1 columns text-center">
                        <ul className="confirmation-count">
                          <li>10</li>
                          <li>3</li>
                          <li>2</li>
                        </ul>
                      </div>
                      <div className="small-2 columns text-center">
                        <ul className="project-count">
                          <li>4</li>
                          <li>3</li>
                          <li>1</li>
                        </ul>
                      </div>
                      <div className="small-3 columns text-right">
                        <textarea placeholder="enter message here" />
                        <img className="icon-message" src="/static/images/icon_message.svg" />
                      </div>
                    </div>
                  </div>
                  <div className="project-body-list-row">
                    <div className="row">
                      <div className="small-3 columns">
                        <img src="http://ipfs.io/ipfs/QmaMWaiwSVpMBBGihiHJ9N6FpM1QD9XiiyQSBCWJSEQ9md" className="profile-photo" />
                        <span className="name">Henry Thomas</span>
                      </div>
                      <div className="small-3 columns">
                        <ul className="skills">
                          <li>Front End Design</li>
                          <li>Adobe Illustrator</li>
                          <li>SEO</li>
                        </ul>
                      </div>
                      <div className="small-1 columns text-center">
                        <ul className="confirmation-count">
                          <li>10</li>
                          <li>3</li>
                          <li>2</li>
                        </ul>
                      </div>
                      <div className="small-2 columns text-center">
                        <ul className="project-count">
                          <li>4</li>
                          <li>3</li>
                          <li>1</li>
                        </ul>
                      </div>
                      <div className="small-3 columns text-right">
                        <textarea placeholder="enter message here" />
                        <img className="icon-message" src="/static/images/icon_message.svg" />
                      </div>
                    </div>
                  </div>
                  <div className="project-body-list-row">
                    <div className="row">
                      <div className="small-3 columns">
                        <img src="http://ipfs.io/ipfs/QmaMWaiwSVpMBBGihiHJ9N6FpM1QD9XiiyQSBCWJSEQ9md" className="profile-photo" />
                        <span className="name">Henry Thomas</span>
                      </div>
                      <div className="small-3 columns">
                        <ul className="skills">
                          <li>Front End Design</li>
                          <li>Adobe Illustrator</li>
                          <li>SEO</li>
                        </ul>
                      </div>
                      <div className="small-1 columns text-center">
                        <ul className="confirmation-count">
                          <li>10</li>
                          <li>3</li>
                          <li>2</li>
                        </ul>
                      </div>
                      <div className="small-2 columns text-center">
                        <ul className="project-count">
                          <li>4</li>
                          <li>3</li>
                          <li>1</li>
                        </ul>
                      </div>
                      <div className="small-3 columns text-right">
                        <textarea placeholder="enter message here" />
                        <img className="icon-message" src="/static/images/icon_message.svg" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="project-footer">
              <input type="submit" onClick={this.handleCancel} value="no thanks" className="button button-lt-blue" />
            </div>
          </div>
        </div>
        <div className="small-4 columns" />
      </div>
    )
  }
}
