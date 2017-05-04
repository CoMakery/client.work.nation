import {d} from 'lightsaber/lib/log'
import React from 'react'

import {ProjectAutosuggest, SkillAutosuggest} from '..'
import UportUser from '../../models/UportUser'

export default class ClaimSkill extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      skill: null,
      projectId: null,
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    UportUser.claimSkill(this.state.skill, this.state.projectId)
  }

  updateSkill = (skill) => this.setState({skill})

  updateProjectId = (projectId) => this.setState({projectId})

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="small-5 columns">
              <SkillAutosuggest onValueUpdate={this.updateSkill} />
            </div>
            <div className="small-5 columns">
              <ProjectAutosuggest {...this.props} onValueUpdate={this.updateProjectId} />
            </div>
            <div className="small-2 columns">
              <input type="submit" value="add" className="button button-cyan button-thin button-fullwidth" />
            </div>
          </div>
        </form>
      </div>
    )
  }
}
