import isBlank from 'is-blank'
import isPresent from 'is-present'
import {clone} from 'lodash'
import axios from 'axios'
import {d} from 'lightsaber/lib/log'
import React from 'react'

import UportUser from '../../models/UportUser'
import './Projects.css'

export default class Projects extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      uportAddress: this.props.match.params.uportAddress,
      errors: [],
    }
  }

  componentDidMount() {
    const serverUrl = `http://localhost:3000/users`  // TODO: server `/projects` endpoint
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
        <h2>My Project Feed</h2>
        <h3>Project Neptune</h3>
        <table>
          <tbody>
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
          <td>[avatar]</td>
          <td>{user.name || '[Name unknown]'}</td>
          <td>{skill.name}</td>
          {this.confirmationColumns(skill)}
        </tr>
      })
    })
  }

  confirmationColumns = (skill) => {
    if (this.props.currentUser) {
      return [
        <td key={skill.ipfsReputonKey + '-unconfirm'}>[ O ]</td>,
        <td key={skill.ipfsReputonKey + '-confirm'}><span className="button" onClick={this.handleConfirm} data-skill={skill.ipfsReputonKey}>[ O ]</span></td>,
      ]
    }
  }

}
