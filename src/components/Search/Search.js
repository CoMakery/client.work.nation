import {d} from 'lightsaber/lib/log'
import React from 'react'
import isPresent from 'is-present'

import {SkillAutosuggest} from '..'
import Auth from '../../models/Authentication'
import server from '../../models/Server'

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      skill: null,
      people: [],
    }
  }

  componentWillMount() {
    Auth.redirectUnlessLoggedIn(this.props)
  }

  updateSkill = (skill) => this.setState({skill})

  search = () => {
    document.querySelector('.loading-spinner').style.display = 'block'
    const projectsApiUrl = `${process.env.REACT_APP_API_SERVER}/users/?perspective=${Auth.getUportAddress()}&skill=${this.state.skill}&depth=3`
    server.get(projectsApiUrl).then(response => {
      d({results: response.data})
      this.setState({people: response.data})//, () => d(this.state))
      document.querySelector('.loading-spinner').style.display = 'none'
      if (isPresent(response.data)) {
        document.querySelector('.project-body-list').style.display = 'block'
      } else {
        console.log('No Results')  // TODO show in UI
      }
    })
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
              <h2 className="">Search</h2>
            </div>
            <div className="project-body">
              <div className="project-body-subheader">
                <div className="row">
                  <div className="small-6 columns no-right-padding">
                    <h3>Search for People by Expertise</h3>
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
              {/* <input type="submit" onClick={this.handleCancel} value="no thanks" className="button button-lt-blue" /> */}
            </div>
          </div>
        </div>
        <div className="small-4 columns" />
      </div>
    )
  }

  showPerson = (person) => (
    <div className="project-body-list-row" key={person.uportAddress}>
      <div className="row">
        <div className="small-3 columns">
          <img src={'//ipfs.io/ipfs/' + person.avatarImageIpfsKey} className="profile-photo" />
          <span className="name">{person.name}</span>
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
)

}
