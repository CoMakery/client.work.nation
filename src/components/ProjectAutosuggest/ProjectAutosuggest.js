import {d} from 'lightsaber/lib/log'
import React from 'react'
import Autosuggest from 'react-autosuggest'
import http from 'axios'
import isPresent from 'is-present'
import debug from 'debug'

const error = debug('wn:error')
const ADD_PROJECT = 'Add Project'

export default class ProjectAutosuggest extends React.Component {
  constructor(props) {
    super(props)

    this.onValueUpdate = props.onValueUpdate

    this.state = {
      options: [],
      suggestions: [],
      value: '',
    }
  }

  componentWillMount() {
    const projectsApiUrl = `${process.env.REACT_APP_API_SERVER}/projects`
    http.get(projectsApiUrl).then(response => {
      if (isPresent(response.data)) {
        this.setState({options: response.data}) //, () => d(this.state))
      } else {
        error(`No data found`, `Server URL: ${projectsApiUrl}`)
      }
    }).catch(err => {
      error(`Could not reach server`, `Url: ${projectsApiUrl}`, err.toString())
    })
  }

  getSuggestionValue = suggestion => suggestion.permanodeId

  addProject = () => this.props.history.push('/project')  // TODO fix

  renderSuggestion = data => {
    if (data.name === ADD_PROJECT) {
      return <div className="add-project" onClick={this.addProject}>
        <img src="/static/images/icon_rocket.svg" />
        {ADD_PROJECT}
      </div>
    } else {
      return <div>
        <div>
          {data.name}
        </div>
        <div>
          (DID: {this.didShort(data.permanodeId)})
        </div>
      </div>
    }
  }

  didShort = (did) => {
    let meat = did.replace(/\/ipfs\//, '')
    return `${meat.slice(0, 10)}...${meat.slice(meat.length - 10)}`
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    if (inputLength === 0) return []

    const suggestions = this.state.options.filter(option =>
      option.name.toLowerCase().slice(0, inputLength) === inputValue
    )
    return (suggestions.length === 0) ? [{name: ADD_PROJECT, permanodeId: ''}] : suggestions
  }

  onChange = (event, {newValue}) => {
    this.setState({value: newValue})
    this.onValueUpdate(newValue)
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  render() {
    const inputProps = {
      placeholder: 'Which project did you use this skill on?',
      value: this.state.value,
      onChange: this.onChange,
    }

    return (
      <Autosuggest
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    )
  }
}
