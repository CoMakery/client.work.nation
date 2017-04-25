import React from 'react'

export default class Project extends React.Component {
  constructor(props) {
    super(props)
    if (!props.currentUser) props.history.push('/login')

    this.state = {
      title: '',
      address: '',
      contact: '',
      skills: '',
      imageUrl: '',
      placeholderImageUrl: '/static/images/rocketship.png',
    }
  }

  updateOptions = (event) => {
    let newState = {}
    newState[event.target.id] = event.target.value
    this.setState(newState)
  }

  render() {
    return <div>
      <h2>Project Setup</h2>
      <label>
        <span>Project Title</span>
        <input type="text" id="title" value={this.state.title} onChange={this.updateOptions} />
      </label>
      <label>
        <span>Connect Your Project</span>
        <input type="text" id="title" value={this.state.address} onChange={this.updateOptions} />
      </label>
      <label>
        <span>Project Contact</span>
        <input type="text" id="title" value={this.state.contact} onChange={this.updateOptions} />
      </label>
      <label>
        <span>Skill Sets</span>
        <input type="text" id="title" value={this.state.skills} onChange={this.updateOptions} />
      </label>

      <img src={this.state.imageUrl || this.state.placeholderImageUrl} />
      <label>
        <input type="text" id="imageUrl"
          value={this.state.imageUrl}
          onChange={this.updateOptions} placeholder="project image link" />
      </label>

      <input type="submit" value="add project" className="button" />
    </div>
  }
}
