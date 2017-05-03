import {d} from 'lightsaber/lib/log'
import React from 'react'
import Autosuggest from 'react-autosuggest'
import http from 'axios'
import isPresent from 'is-present'
import debug from 'debug'

const error = debug('wn:error')

export default class SkillAutosuggest extends React.Component {
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

  renderSuggestion = suggestion => (
    <div>
      <div>
        {suggestion.name}
      </div>
      <div>
        (DID: {this.didShort(suggestion.permanodeId)})
      </div>
    </div>
  )

  didShort = (did) => {
    let meat = did.replace(/\/ipfs\//, '')
    return `${meat.slice(0, 10)}...${meat.slice(meat.length - 10)}`
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0 ? [] : this.state.options.filter(option =>
      option.name.toLowerCase().slice(0, inputLength) === inputValue
    )
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
