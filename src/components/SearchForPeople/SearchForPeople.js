import {d} from 'lightsaber/lib/log'
import React from 'react'
import isPresent from 'is-present'

import {Avatar, Profile, SkillAutosuggest} from '..'
import Auth from '../../models/Authentication'
import server from '../../models/Server'

export default class SearchForPeople extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      skill: null,
      people: [],
      profileUportAddress: null,
    }
  }

  componentDidMount() {
    this.setState({skill: 'Ruby'}, () => this.search())
  }

  updateSkill = (skill) => this.setState({skill})

  search = () => {
    document.querySelector('.loading-spinner').style.display = 'block'
    const projectsApiUrl = `${process.env.REACT_APP_API_SERVER}/users/?perspective=${Auth.getUportAddress()}&skill=${this.state.skill}&depth=3`
    server.get(projectsApiUrl).then(response => {
      // d({results: response.data})
      this.setState({people: response.data})//, () => d(this.state))
      document.querySelector('.loading-spinner').style.display = 'none'
      if (isPresent(response.data)) {
        document.querySelector('.project-body-list').style.display = 'block'
      } else {
        console.log('No Results')  // TODO show in UI
      }
    })
  }

  handleCancel = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <div className="float-right">
          {this.renderProfile()}
        </div>

        <div className="row">
          <div className="small-12 columns">

            <div className="claim-skill-container">
              <h1 className="project-name">work.nation</h1>
            </div>
            <div className="project-container">
              <div className="project-header">
                <h2 className="">{this.props.title}</h2>
              </div>
              <div className="project-body">
                <div className="project-body-subheader">
                  <div className="row">
                    <div className="small-6 columns no-right-padding">
                      <h3>{this.props.subtitle}</h3>
                      <div className="skill-search">
                        <SkillAutosuggest onValueUpdate={this.updateSkill} />
                      </div>
                    </div>
                    <div className="small-1 columns no-padding skill-search-button-outside">
                      <div className="skill-search-button-inside">
                        <img src="/static/images/button_search.svg" onClick={this.search} className="skill-search-button" />
                      </div>
                    </div>
                    <div className="small-2 columns no-padding loading-spinner-outside">
                      <div className="loading-spinner-inside">
                        <img src="/static/images/loading.gif" className="loading-spinner" />
                      </div>
                    </div>
                    <div className="small-2 columns" />
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
                {this.props.cancelButton ? this.cancelButton() : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  showPerson = (person) => {
    return <div className="project-body-list-row" key={person.uportAddress}>
      <div className="row">
        <div className="small-3 columns">
          <Avatar avatarImageIpfsKey={person.avatarImageIpfsKey} name={person.name} />
          <a href="#" onClick={this.showProfile}>
            <span className="name" data-uport-address={person.uportAddress}>{person.name}</span>
          </a>
        </div>
        <div className="small-3 columns">
          <ul className="skills">
            {person.skills.map(skill => <li key={skill.name}>{skill.name}</li>) }
          </ul>
        </div>
        <div className="small-1 columns text-center">
          <ul className="confirmation-count">
            {person.skills.map(skill => <li key={skill.name}>{skill.confirmationsCount}</li>) }
          </ul>
        </div>
        <div className="small-2 columns text-center">
          <ul className="project-count">
            {person.skills.map(skill => <li key={skill.name}>{skill.projectCount}</li>) }
          </ul>
        </div>
        <div className="small-3 columns text-right">
          <textarea placeholder="enter message here" />
          <img className="icon-message" src="/static/images/icon_message.svg" />
        </div>
      </div>
    </div>
  }

  renderProfile = () => {
    if (this.state.profileUportAddress) {
      return <Profile {...this.props} uportAddress={this.state.profileUportAddress} />
    } else {
      return <div className="profile-placeholder" />
    }
  }

  showProfile = (event) => {
    event.preventDefault()
    this.setState({profileUportAddress: event.target.dataset.uportAddress}, () => d({'this.state.profileUportAddress': this.state.profileUportAddress}))
  }

  cancelButton = () =>
    <input type="submit" onClick={this.handleCancel} value={this.props.cancelButton}
      className="button button-lt-blue" />

}
