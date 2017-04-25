import React from 'react'

import Auth from '../../models/Authentication'

export default class Project extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
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

  render() {
    return (
      <div className="project-container">
        <div className="project-header">
          <h2 className="">Project Setup</h2>
        </div>
        <div className="project-body">
          <div className="row project-body-row">
            <div className="small-8 columns">
              <label>
                <span>Project Title</span>
                <input type="text" id="title" value={this.state.title} onChange={this.updateOptions} />
              </label>
              <label>
                <span>Connect Your Project</span>
                <input type="text" id="title" value={this.state.address} onChange={this.updateOptions} placeholder="project URL / ethereum contract address" />
              </label>
              <label>
                <span>Project Contact</span>
                <input type="text" id="title" value={this.state.contact} onChange={this.updateOptions} placeholder="email address for prototype. (2.0: uPort address only (project owner))" />
              </label>
              <label>
                <span>Skill Sets</span>
                <input type="text" id="title" value={this.state.skills} onChange={this.updateOptions} placeholder="separate by comma" />
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
          <input type="submit" value="add project" className="button button-lt-blue" />
        </div>
      </div>
    )
  }
}
