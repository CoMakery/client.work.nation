import isBlank from 'is-blank'
import isPresent from 'is-present'
import {clone} from 'lodash'
import axios from 'axios'
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
    axios.get(serverUrl).then(response => {
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
      <div>
        <h2>Confirmation Feed</h2>
        <table>
          <tbody>
            <tr>
              <td>Date</td>
              <td>Project Name</td>
              <td>Team Member</td>
              <td>Skill</td>
              <td>Confirm</td>
            </tr>
            { this.rows() }
          </tbody>
        </table>
      </div>
    )
  }

  rows = () => {
    if (isBlank(this.state.users)) return
    return this.state.users.map((user) => {
      return user.skills.map((skill) => {
        return <tr>
          <td>17 April 2017</td>
          <td>Project Neptune</td>
          <td>[avatar] {user.name || '[Name unknown]'}</td>
          <td>{skill.name}</td>
          {this.confirmationColumns(skill)}
        </tr>
      })
    })
  }

  confirmationColumns = (skill) => {
    if (this.props.currentUser) {
      return <td key={skill.ipfsReputonKey + '-confirm'}>
        <span onClick={this.handleConfirm} data-skill={skill.ipfsReputonKey}>
          <img src="/static/images/icon_confirm.png" />
        </span>
      </td>
    }
  }

}
