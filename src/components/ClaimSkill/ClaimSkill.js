import { d } from 'lightsaber/lib/log'
import React from 'react'
import './ClaimSkill.css'

export default class Rate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.state.uportUser.claimSkill(this.state.skill)
    .then(() => d('success'))
    .catch(error => console.error(error))
  }

  updateOptions = (event) => {
    let newState = {}
    newState[event.target.id] = event.target.value
    this.setState(newState, () => d(this.state))
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type='text' id='skill' value={this.state.skill} onChange={this.updatOptions} />
          </label>
          <input type='submit' value='>' />
        </form>
      </div>
    )
  }
}
