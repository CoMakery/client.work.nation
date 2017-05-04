import {d} from 'lightsaber/lib/log'
import React from 'react'
import Autosuggest from 'react-autosuggest'
import isPresent from 'is-present'
import debug from 'debug'

import server from '../../models/Server'

const error = debug('wn:error')

export default class SkillAutosuggest extends React.Component {
  constructor(props) {
    super(props)

    this.onValueUpdate = props.onValueUpdate

    this.state = {
      skills: [],
      suggestions: [],
      value: '',
    }
  }

  componentWillMount() {
    const skillsApiUrl = `${process.env.REACT_APP_API_SERVER}/skills`
    server.get(skillsApiUrl).then(response => {
      if (isPresent(response.data)) {
        this.setState({skills: response.data}) //, () => d(this.state))
      } else {
        error(`No data found`, `Server URL: ${skillsApiUrl}`)
      }
    })
  }

  getSuggestionValue = suggestion => suggestion

  renderSuggestion = suggestion => (
    <div>
      {suggestion}
    </div>
  )

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0 ? [] : this.state.skills.filter(skill =>
      skill.toLowerCase().slice(0, inputLength) === inputValue
    )
  }

  onChange = (event, { newValue }) => {
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
      placeholder: 'Skill',
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
