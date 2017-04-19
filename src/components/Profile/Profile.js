import isPresent from 'is-present'
import {clone, omit} from 'lodash'
import axios from 'axios'
import {d} from 'lightsaber/lib/log'
import React from 'react'

import './Profile.css'

export default class Profile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      uportAddress: this.props.match.params.uportAddress,
      name: null,
      skills: [],
      errors: [],
    }
  }

  componentDidMount() {
    const serverUrl = `http://localhost:3000/users/${this.state.uportAddress}`
    axios.get(serverUrl).then(response => {
      if (isPresent(response.data)) {
        const newData = omit(response.data, 'uportAddress')
        this.setState(newData)
      } else {
        this.addError(`No data found for user ${this.state.uportAddress}`, `Server URL: ${serverUrl}`)
      }
    }).catch(err => {
      this.addError(`Could not reach server`, `Url: ${serverUrl}`, err.toString())
    })
  }

  addError(message, details) {
    let errors = clone(this.state.errors)
    errors.push([message, details])
    this.setState({errors}, () => d({state: this.state}))
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
        <h3><a href={'https://ropsten.io/address/' + this.state.uportAddress}>{this.state.name}</a></h3>
        <h3>Skills</h3>
        <table>
          <tbody>
            <tr>
              <th>confirmations</th>
              <th />
              <th />
              <th># of projects</th>
            </tr>
            { this.rows() }
          </tbody>
        </table>
      </div>
    )
  }

  rows = () => {
    return this.state.skills.map((skill, index) => {
      return <tr key={index}>
        <td>{skill.confirmationCount}</td>
        <td>{skill.name}</td>
        <td />
        <td>{skill.projectCount}</td>
      </tr>
    })
  }
}
