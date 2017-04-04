import React from 'react'

import './App.css'

export default class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  }

  render() {
    return (
      <div id='react-container'>
        <h1>Work.nation</h1>
        {this.props.children}
      </div>
    )
  }
}
