import {d} from 'lightsaber/lib/log'
import React from 'react'

import UportUser from '../../models/UportUser'

export default class ClaimSkill extends React.Component {
  constructor(props) {
    super(props)
    if (!props.currentUser) {
      this.props.history.push('/login')
    }
    this.state = {
      skill: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    UportUser.claimSkill(this.props.currentUser, this.state.skill)
  }

  updateOptions = (event) => {
    let newState = {}
    newState[event.target.id] = event.target.value
    this.setState(newState)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="columns expand">
              <label>
                <input type="text" id="skill" value={this.state.skill} onChange={this.updateOptions} />
              </label>
            </div>
            <div className="columns shrink">
              <input type="submit" value=">" className="button" />
            </div>
          </div>
        </form>
      </div>
    )
  }
}
