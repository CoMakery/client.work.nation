import {d} from 'lightsaber/lib/log'
import React from 'react'

import UportUser from '../../models/UportUser'
import Auth from '../../models/Authentication'

export default class ClaimSkill extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      skill: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    UportUser.claimSkill(this.state.skill)
  }

  updateOptions = (event) => {
    let newState = {}
    newState[event.target.id] = event.target.value
    this.setState(newState)
  }

  render() {
    if (!Auth.getCurrentUser()) return null

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div>
              <label>
                <input type="text" id="skill" value={this.state.skill} onChange={this.updateOptions} placeholder="Skill" />
              </label>
              <label>
                <input type="text" id="project" value={this.state.project} onChange={this.updateOptions} placeholder="Project" />
              </label>
            </div>
            <div>
              <input type="submit" value="add" className="button" />
            </div>
          </div>
        </form>
      </div>
    )
  }
}
