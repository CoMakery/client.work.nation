import isBlank from 'is-blank'
import isPresent from 'is-present'
import http from 'axios'
import {d} from 'lightsaber/lib/log'
import React from 'react'
import debug from 'debug'

import UportUser from '../../models/UportUser'
import Auth from '../../models/Authentication'

const error = debug('wn:error')

export default class Confirm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      uportAddress: this.props.match.params.uportAddress,
      errors: [],
    }
  }

  componentWillMount() {
    Auth.redirectUnlessLoggedIn(this.props)
  }

  componentDidMount() {
    const serverUrl = `${process.env.REACT_APP_API_SERVER}/users`  // TODO: server `/projects` endpoint
    http.get(serverUrl).then(response => {
      if (isPresent(response.data)) {
        this.setState({users: response.data}) //, () => d(this.state))
        if (response.data.length <= 7) { // up to 7 rows of data for dynamic height
          this.state.confirmDivHeight = (response.data.length + 1) * 47
        } else { // beyond 7 rows of data and max-height is reached
          this.state.confirmDivHeight = 380
        }
        document.querySelector('.confirm-body-list').style.height = this.state.confirmDivHeight + 'px'
      } else {
        error(`No data found`, `Server URL: ${serverUrl}`)
      }
    }).catch(err => {
      error(`Could not reach server`, `Url: ${serverUrl}`, err.toString())
    })
  }

  handleConfirm = (event) => {
    UportUser.confirmSkill(event.target.dataset.skill)
  }

  render() {
    if (!Auth.getCurrentUser()) return null

    return (
      <div className="row">
        <div className="small-8 columns">
          <div className="claim-skill-container">
            <h1 className="project-name">work.nation</h1>
          </div>
          <div className="confirm-container">
            <div className="confirm-header">
              <h2 className="">Confirmation Feed</h2>
            </div>
            <div className="confirm-body">
              <div className="confirm-body-subheader">
                <div className="row">
                  <div className="small-2 columns">Date</div>
                  <div className="small-3 columns">Project Name</div>
                  <div className="small-3 columns">Team Member</div>
                  <div className="small-3 columns">Skill</div>
                  <div className="small-1 columns">Confirm</div>
                </div>
              </div>
              <div className="confirm-body-list">
                { this.rows() }
              </div>
            </div>
            <div className="confirm-footer">
              {/* <span className="footer-note">to edit multiple, select all you want to confirm</span> */}
              <input type="button" className="button button-cyan" value="save" />
            </div>
          </div>
        </div>
        <div className="small-4 columns" />
      </div>
    )
  }

  rows = () => {
    if (isBlank(this.state.users)) return
    return this.state.users.map((user) => {
      return user.skillClaims.map((skill) => {
        return <div className="confirm-body-row-wrapper">
          <div className="row confirm-body-row">
            <div className="small-2 columns">17 April 2017</div>
            <div className="small-3 columns">Project Neptune</div>
            <div className="small-3 columns">[avatar] {user.name || '[Name unknown]'}</div>
            <div className="small-3 columns">{skill.name}</div>
            {this.confirmationColumns(skill)}
          </div>
        </div>
      })
    })
  }

  confirmationColumns = (skill) => {
    if (this.props.currentUser) {
      return <div key={skill.ipfsReputonKey + '-confirm'} className="small-1 columns text-center cell-end-row">
        <span onClick={this.handleConfirm} data-skill={skill.ipfsReputonKey}>
          <img className="icon-confirm" src="/static/images/icon_confirmed.svg" />
        </span>
      </div>
    }
  }

}
