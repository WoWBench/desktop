import * as React from 'react'
import { ipcRenderer } from 'electron';
import { Navbar } from './Bulma/Navbar';
import { WindowActions } from './WindowActions'
import { GameManager } from "./WoWBench/GameManager";
import { Install } from "./Install";

const store = window.localStorage;

export interface Props {
  brandLogo?: string
  manager?: GameManager,
}

export class App extends React.Component<Props, object> {
  hasInstalls: boolean;

  constructor (props: Props) {
    super(props);
    this.hasInstalls = false;
  }

  componentDidMount () {
    // Check if we have any game installs already
    let installs = store.getItem('installs');
    if (installs === null) {
      return
    }

    this.hasInstalls = true;
  }

  content () {
    if (!this.hasInstalls) {
      return <Install manager={this.props.manager} />
    }
    return (
      <h1>Hello</h1>
    )
  }

  render () {
    let content = this.content();

    return (
      <>
        <Navbar brand="WoWBench" />
        <WindowActions/>
        {content}
      </>
    )
  }
}
