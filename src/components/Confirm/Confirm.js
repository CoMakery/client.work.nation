import moment from 'moment'
import isPresent from 'is-present'
import {d} from 'lightsaber/lib/log'
import React from 'react'
import debug from 'debug'

import Auth from '../../models/Authentication'
import UportUser from '../../models/UportUser'
import server from '../../models/Server'

const error = debug('wn:error')

export default class Confirm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      uportAddress: this.props.match.params.uportAddress,
      errors: [],
      skillClaims: [],
    }
  }

  componentWillMount() {
    Auth.redirectUnlessLoggedIn(this.props)
  }

  componentDidMount() {
    const serverUrl = `${process.env.REACT_APP_API_SERVER}/users/${Auth.getUportAddress()}/confirmations`
    server.get(serverUrl).then(response => {
      if (isPresent(response.data)) {
        this.setState({skillClaims: response.data}) //, () => d(this.state))
        if (response.data.length <= 7) { // up to 7 rows of data for dynamic height
          this.state.confirmDivHeight = (response.data.length) * 51 // 51px row height with margin spacing
        } else { // beyond 7 rows of data and max-height is reached
          this.state.confirmDivHeight = 380
        }
        document.querySelector('.confirm-body-list').style.height = this.state.confirmDivHeight + 'px'
      } else {
        error(`No data found`, `Server URL: ${serverUrl}`)
      }
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
                {this.state.skillClaims.map(skillClaim => this.showSkillClaim(skillClaim))}
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

  showSkillClaim = (skillClaim) => {
    return <div className="confirm-body-row-wrapper" key={skillClaim.ipfsReputonKey}>
      <div className="row confirm-body-row">
        <div className="small-2 columns">{moment(skillClaim.createdAt).format('DD MMM YYYY')}</div>
        <div className="small-3 columns">[Project Name]</div>
        <div className="small-3 columns">
          <img src="/static/images/icon_blank_avatar.svg" className="icon-small-avatar" />
          {skillClaim.user.name || '[Name unknown]'}
        </div>
        <div className="small-3 columns">{skillClaim.name}</div>
        <div key={skillClaim.ipfsReputonKey} className="small-1 columns text-center cell-end-row">
          {this.checkmark(skillClaim)}
        </div>
      </div>
    </div>
  }

  checkmark = (skillClaim) => {
    if (skillClaim.confirmedStatus[Auth.getUportAddress()]) {
      return <span>
        <img className="icon-confirm" src="/static/images/icon_confirmed.svg" />
      </span>
    } else {
      return <span onClick={this.handleConfirm} data-skill={skillClaim.ipfsReputonKey}>
        <img className="icon-confirm" src="/static/images/icon_unconfirmed.svg" />
      </span>
    }
  }
}
