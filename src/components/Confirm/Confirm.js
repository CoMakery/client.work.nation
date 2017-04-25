import isBlank from 'is-blank'
import isPresent from 'is-present'
import {clone} from 'lodash'
import http from 'axios'
import {d} from 'lightsaber/lib/log'
import React from 'react'

import UportUser from '../../models/UportUser'

export default class Confirm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      uportAddress: this.props.match.params.uportAddress,
      errors: [],
    }
  }

  componentDidMount() {
    const serverUrl = `${process.env.REACT_APP_API_SERVER}/users`  // TODO: server `/projects` endpoint
    http.get(serverUrl).then(response => {
      if (isPresent(response.data)) {
        this.setState({users: response.data}) //, () => d(this.state))
      } else {
        // this.addError(`No data found for user ${this.state.uportAddress}`, `Server URL: ${serverUrl}`)
      }
    }).catch(err => {
      this.addError(`Could not reach server`, `Url: ${serverUrl}`, err.toString())
    })
  }

  addError(message, details) {
    let errors = clone(this.state.errors)
    errors.push([message, details])
    this.setState({errors}) //, () => d({state: this.state}))
  }

  handleConfirm = (event) => {
    UportUser.confirmSkill(this.props.currentUser, event.target.dataset.skill)
  }

  render() {
    if (isPresent(this.state.errors)) {
      return <div>{
        this.state.errors.map(([message, detail], key) => {
          return <div className="callout alert" key={key} >
            <h5>{message}</h5>
            <p>{detail}</p>
          </div>
        })
      }</div>
    }

    // If no errors:
    return (
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
          <div className="confirm-body-scroll">
            { this.rows() }
          </div>
        </div>
        <div className="confirm-footer">
          <span className="footer-note">to edit multiple, select all you want to confirm</span>
          <input type="button" className="button" value="save" />
        </div>
      </div>
    )
  }

  rows = () => {
    if (isBlank(this.state.users)) return
    return this.state.users.map((user) => {
      return user.skills.map((skill) => {
        return <div className="confirm-body-row-wrapper">
          <div className="row confirm-body-row">
            <div className="small-2 columns">17 April 2017</div>
            <div className="small-3 columns">Project Neptune</div>
            <div className="small-3 columns">[avatar] {user.name || '[Name unknown]'}</div>
            <div className="small-3 columns">{skill.name}</div>
            {this.confirmationColumns(skill)}
          </div>
        </div>
        // return <tr>
        //   <td>17 April 2017</td>
        //   <td>Project Neptune</td>
        //   <td>[avatar] {user.name || '[Name unknown]'}</td>
        //   <td>{skill.name}</td>
        //   {this.confirmationColumns(skill)}
        // </tr>
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
