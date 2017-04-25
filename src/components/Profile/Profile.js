import isPresent from 'is-present'
import {clone, omit} from 'lodash'
import http from 'axios'
import {d} from 'lightsaber/lib/log'
import React from 'react'

export default class Profile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      uportAddress: this.props.uportAddress,
      name: null,
      skills: [],
      errors: [],
    }
  }

  componentDidMount() {
    if (!this.state.uportAddress) {
      this.addError(`Can't load user "null"`)
      return
    }
    const serverUrl = `${process.env.REACT_APP_API_SERVER}/users/${this.state.uportAddress}`
    http.get(serverUrl).then(response => {
      if (isPresent(response.data)) {
        // d(response.data)
        const newData = omit(response.data, 'uportAddress')
        this.setState(newData) //, () => d({state: this.state}))
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
    this.setState({errors}) // , () => d({state: this.state}))
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
        {this.avatar()}
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

  avatar = () => {
    if (this.state.avatar_image_ipfs_key) {
      return <img src={'//ipfs.io/ipfs/' + this.state.avatar_image_ipfs_key} />
    }
  }
}
