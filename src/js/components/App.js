import React from 'react'
import { Navbar } from './Bulma/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class App extends React.Component {
  render () {
    return (
      <>
        <Navbar brand="WoWBench" />
        <h1>Hello</h1>
        <div className="window-actions">
          <button onClick={close}><FontAwesomeIcon icon="times" /></button>
        </div>
      </>
    )
  }
}
