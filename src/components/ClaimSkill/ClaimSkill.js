import {d} from 'lightsaber/lib/log'
import React from 'react'

import {ProjectAutosuggest, SkillAutosuggest} from '..'
import UportUser from '../../models/UportUser'

export default class ClaimSkill extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    UportUser.claimSkill(this.state.skill)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="small-5 columns">
              <SkillAutosuggest />
            </div>
            <div className="small-5 columns">
              <ProjectAutosuggest />
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
