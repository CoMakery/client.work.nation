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
      skill_claims: [],
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

  addError(message, ...details) {
    let errors = clone(this.state.errors)
    errors.push([message, ...details])
    this.setState({errors}) //, () => d({state: this.state}))
  }

  render() {
    if (isPresent(this.state.errors)) {
      return <div>{
        this.state.errors.map(([message, ...details], key) => {
          return <div className="callout alert" key={key} >
            <h5>{message}</h5>
            {details.map(detail => <p>{detail}</p>)}
          </div>
        })
      }</div>
    }

    // If no errors:
    // d({state: this.state})
    return (
      <div className="profile-container">
        <div className="profile-header">
          { this.avatar() }
          <h2 className="">{this.state.name}</h2>
          <div className="small"><a href={'#'}>view reputon data</a></div>
          <div className="small"><a href={'https://ropsten.io/address/' + this.state.uportAddress} target="_blank">view uPort Ethereum contract</a></div>
        </div>
        <div className="profile-body">
          <div className="profile-body-list">
            <h3>Skills</h3>
            <div className="profile-body-list-subheader">
              <div className="row">
                <div className="small-2 columns small">
                  confirmations
                </div>
                <div className="small-7 columns" />
                <div className="small-3 columns small">
                  # of projects
                </div>
              </div>
            </div>
            <div className="profile-body-list-scroll">
              { this.skills() }
            </div>
          </div>
          <div className="profile-body-list">
            <h3>Projects</h3>
            <div className="profile-body-list-scroll">
              <div>Manic Mondays</div>
              <div>Project Tuesday</div>
              <div>Lorem Ipsum</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  avatar = () => {
    if (this.state.avatar_image_ipfs_key) {
      return <img src={'//ipfs.io/ipfs/' + this.state.avatar_image_ipfs_key} />
    }
  }

  skills = () => {
    return this.state.skill_claims.map((skill, index) => {
      return [
        <div key={index} className="row">
          <div className="small-2 columns small confirmation-count">
            {skill.confirmationCount}
          </div>
          <div className="small-8 columns">
            {skill.name}<br />
            {this.confirmations(skill)}
          </div>
          <div className="small-2 columns small project-count">
            {skill.projectCount}
          </div>
        </div>
      ]
    })
  }

  confirmations = (skill) => {
    return [
      <div key="temporary-key">
        <p className="tiny">
          {skill.confirmationCount} confirmations from
          Project Neptune: {skill.confirmations.map(conf => conf.confirmerName).join(', ')}
        </p>
        <p className="tiny">
          {skill.confirmationCount} confirmations from
          Project Jupiter: {skill.confirmations.map(conf => conf.confirmerName).join(', ')}
        </p>
      </div>
    ]
  }
}
