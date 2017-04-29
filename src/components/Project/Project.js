import { d } from 'lightsaber/lib/log'
import React from 'react'
import { omit } from 'lodash'

import Auth from '../../models/Authentication'
import UportUser from '../../models/UportUser'

export default class Project extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      address: '',
      contact: '',
      skills: '',
      imageUrl: '',
      placeholderImageUrl: '/static/images/rocketship.png',
    }
  }

  componentWillMount() {
    Auth.redirectUnlessLoggedIn(this.props)
  }

  updateOptions = (event) => {
    let newState = {}
    newState[event.target.id] = event.target.value
    this.setState(newState)
  }

  handleSubmit = () => {
    if (process.env.REACT_APP_FAKE_LOGIN) {
      this.props.history.push('/project_setup/QmagDwhvQdi8G3onRcrVSPFtYQDiQyCK33xDNLtmEUM1Mw')
    } else {
      // TODO catch any errors and display
      UportUser.createProject(omit(this.state, 'placeholderImageUrl')) // eslint-disable-line promise/catch-or-return
      .then((projectId) => {
        return this.props.history.push(`/project_setup/${projectId}`)
      })
    }
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
              <div className="row project-body-form">
                <div className="small-8 columns">
                  <label>
                    <span>Project Title</span>
                    <input type="text" id="name" value={this.state.name} onChange={this.updateOptions} />
                  </label>
                  <label>
                    <span>Connect Your Project</span>
                    <input type="text" id="address" value={this.state.address} onChange={this.updateOptions} placeholder="project URL / ethereum contract address" />
                  </label>
                  <label>
                    <span>Project Contact</span>
                    <input type="text" id="contact" value={this.state.contact} onChange={this.updateOptions} placeholder="email address for prototype. (2.0: uPort address only (project owner))" />
                  </label>
                  <label>
                    <span>Skill Sets</span>
                    <input type="text" id="skills" value={this.state.skills} onChange={this.updateOptions} placeholder="separate by comma" />
                  </label>
                </div>
                <div className="small-4 columns">
                  <img className="project-image" src={this.state.imageUrl || this.state.placeholderImageUrl} />
                  <label>
                    <input type="text" id="imageUrl"
                      value={this.state.imageUrl}
                      onChange={this.updateOptions} placeholder="project image link" />
                  </label>
                </div>
              </div>
            </div>
            <div className="project-footer">
              <input type="submit" onClick={this.handleSubmit} value="add project" className="button button-lt-blue" />
            </div>
          </div>
        </div>
        <div className="small-4 columns" />
      </div>
    )
  }
}
