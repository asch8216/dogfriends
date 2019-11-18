import React from 'react'
//import {connect} from 'react-redux'

export default class Matches extends React.Component {
  render() {
    return (
      <div>
        <h1>Possible Matches</h1>
        <div>
          <h2>Click on the link to send an email</h2>
          <li>
            <a href="mailto:tom@email.com">Thomas Smith</a>
          </li>
          <li>
            <a href="mailto:john@email.com">John Jones</a>
          </li>
          <li>
            <a href="mailto:bob@email.com">Bob Clark</a>
          </li>
        </div>
      </div>
    )
  }
}
