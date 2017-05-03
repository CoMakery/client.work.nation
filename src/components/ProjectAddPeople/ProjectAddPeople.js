import {d} from 'lightsaber/lib/log'
import React from 'react'
import http from 'axios'
import isPresent from 'is-present'
import debug from 'debug'

import Auth from '../../models/Authentication'
import {SkillAutosuggest} from '..'

const error = debug('wn:error')

export default class ProjectAddPeople extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      skill: null,
      people: [],
    }
  }

  componentWillMount() {
    Auth.redirectUnlessLoggedIn(this.props)
    // TODO also redirect unless current user is project owner
  }

  updateSkill = (skill) => this.setState({skill})

  search = () => {
    // /users?perspective=0xff902fc776998336a213c5c6050a4572b7453643&skill=UX&depth=4
    const projectsApiUrl = `${process.env.REACT_APP_API_SERVER}/users/?perspective=${Auth.getUportAddress()}&skill=${this.state.skill}&depth=4`
    http.get(projectsApiUrl).then(response => {
      if (isPresent(response.data)) {
        this.setState({people: response.data}, () => d(this.state))
      } else {
        error(`No data found`, `Server URL: ${projectsApiUrl}`)
      }
    }).catch(err => {
      error(`Could not reach server`, `Url: ${projectsApiUrl}`, err.toString())
    })
  }

  handleCancel = () => {
    this.props.history.push('/')
  }

  render() {
    if (!Auth.getCurrentUser()) return null

    return (
      <div className="row">
        <div className="small-8 columns">
          <div className="claim-skill-container">
            <h1 className="project-name">work.nation</h1>
          </div>
          <div className="project-container">
            <div className="project-header">
              <h2 className="">Project Setup</h2>
            </div>
            <div className="project-body">
              <div className="project-body-subheader">
                <div className="row">
                  <div className="small-6 columns">
                    <h3>Search for more team members</h3>
                    <div className="skill-search">
                      <SkillAutosuggest onValueUpdate={this.updateSkill} />
                      <button className="button" onClick={this.search}>[Magnifying Glass]</button>
                    </div>
                  </div>
                  <div className="small-6 columns" />
                </div>
              </div>
              <div className="project-body-list">
                <div className="project-body-list-subheader">
                  <div className="row">
                    <div className="small-3 columns">candidate</div>
                    <div className="small-3 columns">skill</div>
                    <div className="small-1 columns text-center">confirmations</div>
                    <div className="small-2 columns text-center"># of projects</div>
                    <div className="small-3 columns">invite</div>
                  </div>
                </div>
                <div className="project-body-list-scroll">
                  {this.state.people.map(person => this.showPerson(person))}
                </div>
              </div>
            </div>
            <div className="project-footer">
              <input type="submit" onClick={this.handleCancel} value="no thanks" className="button button-lt-blue" />
            </div>
          </div>
        </div>
        <div className="small-4 columns" />
      </div>
    )
  }

  showPerson = (person) => (
    <div className="project-body-list-row">
      <div className="row">
        <div className="small-3 columns">
          <img src={'//ipfs.io/ipfs/' + person.avatarImageIpfsKey} className="profile-photo" />
          <span className="name">{person.name}</span>
        </div>
        <div className="small-3 columns">
          <ul className="skills">
            {person.skillClaims.map(skill => <li>{skill.name}</li>) }
          </ul>
        </div>
        <div className="small-1 columns text-center">
          <ul className="confirmation-count">
            {person.skillClaims.map(skill => <li>{skill.confirmationCount}</li>) }
          </ul>
        </div>
        <div className="small-2 columns text-center">
          <ul className="project-count">
            {person.skillClaims.map(skill => <li>{skill.projectCount}</li>) }
          </ul>
        </div>
        <div className="small-3 columns text-right">
          <textarea placeholder="enter message here" />
          <img className="icon-message" src="/static/images/icon_message.svg" />
        </div>
      </div>
    </div>
)

}
