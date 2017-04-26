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
      this.addError(`Can't load user "${this.state.uportAddress}"`)
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
    d({state: this.state})
    return (
      <div>
        {this.avatar()}
        <h2>{this.state.name}</h2>
        <div><a href={'#'}>view retupton data</a></div>
        <div><a href={'https://ropsten.io/address/' + this.state.uportAddress} target="_blank">view uPort Ethereum contract</a></div>
        <h3>Skills</h3>
        <table>
          <tbody>
            <tr>
              <th>confirmations</th>
              <th />
              <th># of projects</th>
            </tr>
            { this.skills() }
          </tbody>
        </table>

        <h3>Projects</h3>
        <div>Manic Mondays</div>
        <div>Project Tuesday</div>
        <div>Lorem Ipsum</div>
      </div>
    )
  }

  avatar = () => {
    if (this.state.avatar_image_ipfs_key) {
      return <img src={'//ipfs.io/ipfs/' + this.state.avatar_image_ipfs_key} />
    }
  }

  skills = () => {
    return this.state.skills.map((skill, index) => {
      return [
        <tr key={index}>
          <td>{skill.confirmationCount}</td>
          <td><b>{skill.name}</b></td>
          <td>{skill.projectCount}</td>
        </tr>,
        this.confirmations(skill)
      ]
    })
  }

  confirmations = (skill) => {
    return this.state.skills.map((skill, index) => {
      return <tr key={index}>
        <td />
        <td>
          {skill.confirmationCount} confirmations from Project Neptune:
          {skill.confirmations.map(conf => conf.confirmerName).join(', ')}
        </td>
        <td />
      </tr>
    })
  }
}
