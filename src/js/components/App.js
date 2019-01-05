import React from 'react'
import { Navbar } from './Bulma/Navbar'

export class App extends React.Component {
  render () {
    return (
      <>
        <Navbar brand="WoWBench" />
        <h1>Hello</h1>
        <button onClick={close}>Close</button>
      </>
    )
  }
}
