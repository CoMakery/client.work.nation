import {d} from 'lightsaber/lib/log'
import React from 'react'
import Autosuggest from 'react-autosuggest'
import isPresent from 'is-present'
import debug from 'debug'

import server from '../../models/Server'

const error = debug('wn:error')
const SETUP_PROJECT = 'Setup a Project'

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
    server.get(projectsApiUrl).then(response => {
      if (isPresent(response.data)) {
        this.setState({options: response.data}) //, () => d(this.state))
      } else {
        error(`No data found`, `Server URL: ${projectsApiUrl}`)
      }
    })
  }

  getSuggestionValue = suggestion => suggestion.permanodeId

  addProject = () => this.props.history.push('/project')  // TODO fix

  renderSuggestion = data => {
    if (data.name === SETUP_PROJECT) {
      return <div className="setup-project" onClick={this.addProject}>
        <img src="/static/images/icon_rocket.svg" className="setup-project" />
        {SETUP_PROJECT}
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
    return (suggestions.length === 0) ? [{name: SETUP_PROJECT, permanodeId: ''}] : suggestions
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
      placeholder: 'Which project did you apply this expertise to?',
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
