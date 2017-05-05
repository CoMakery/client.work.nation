import isPresent from 'is-present'
import {omit} from 'lodash'
import {d} from 'lightsaber/lib/log'
import React from 'react'
import debug from 'debug'

import server from '../../models/Server'

const error = debug('wn:error')

export default class Profile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      uportAddress: this.props.uportAddress,
      name: null,
      skills: [],
      projects: [],
    }
  }

  componentDidMount() {
    if (!this.state.uportAddress) {
      error(`Can't load user "${this.state.uportAddress}"`)
      return
    }
    const serverUrl = `${process.env.REACT_APP_API_SERVER}/users/${this.state.uportAddress}`
    server.get(serverUrl).then(response => {
      if (isPresent(response.data)) {
        // d(response.data)
        this.props.setCurrentUserFromServerHandler(response.data)
        const newData = omit(response.data, 'uportAddress')
        this.setState(newData) // , () => d('Profile', {state: this.state}))
      } else {
        error(`No data found for user ${this.state.uportAddress}`, `Server URL: ${serverUrl}`)
      }
    })
  }

  render() {
    return (
      <div className="profile-container">
        <div className="profile-header">
          <div className="row">
            <div className="small-2 columns no-padding text-center">
              { this.avatar() }
            </div>
            <div className="small-10 columns">
              <h2 className="">{this.state.name}</h2>
              <div className="small"><a href={'#'}>view reputon data</a></div>
              <div className="small"><a href={'https://ropsten.io/address/' + this.state.uportAddress} target="_blank">view uPort Ethereum contract</a></div>
            </div>
          </div>
        </div>
        <div className="profile-body">
          <div className="profile-body-list">
            <h3>Skills</h3>
            <div className="profile-body-list-subheader">
              <div className="row">
                <div className="small-2 columns small no-padding">
                  confirmations
                </div>
                <div className="small-6 columns" />
                <div className="small-4 columns small text-right">
                  # of projects
                </div>
              </div>
            </div>
            <div className="profile-body-list-scroll profile-body-list-scroll-tall">
              { this.skills() }
            </div>
          </div>
          <div className="profile-body-list">
            <h3>Projects</h3>
            <div className="profile-body-list-scroll profile-body-list-scroll-short">
              {this.state.projects.map(project => <div>{project}</div>)}
            </div>
          </div>
        </div>
      </div>
    )
  }

  avatar = () => {
    if (this.state.avatarImageIpfsKey) {
      return <img src={'//ipfs.io/ipfs/' + this.state.avatarImageIpfsKey} className="profile-photo" />
    }
  }

  skills = () => {
    return this.state.skills.map((skill, index) => {
      return [
        <div key={index} className="row">
          <div className="small-2 columns small confirmation-count">
            {skill.confirmationsCount}
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
      <div key={skill.name}>
        <p className="tiny">
          {skill.confirmationsCount} confirmations from {' '}
          {skill.confirmations.map(conf => conf.confirmerName).slice(0, 6).join(', ')}...
        </p>
      </div>
    ]
  }
}
