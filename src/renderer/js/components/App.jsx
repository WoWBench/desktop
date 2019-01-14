import * as React from 'react'
import { Navbar } from './Bulma/Navbar';
import { WindowActions } from './WindowActions'
import { Install } from "./Install";
import { Sidebar } from './Sidebar';
import dispatcher from '../dispatcher';

const store = window.localStorage;

export class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      instances: null
    }
  }

  addInstallation (installation) {
    console.log(installation);
  }

  componentDidMount () {
    const { instances } = this.state;
    dispatcher.register(this.listener.bind(this));

    // Check if we have any game installs already
    let installs = store.getItem('instances');
    if (installs === null) {
      this.setState({instances: 0});
    }

    this.setState({instances: installs});
  }

  content () {
    const { instances } = this.state;

    if (!instances || instances < 1) {
      return <Install />
    }
    return (
      <h1>Hello</h1>
    )
  }

  render () {
    let content = this.content();
    let instances = this.state.instances;

    return (
      <>
        <Navbar brand="WoWBench" />
        <WindowActions/>
        <Sidebar instances={instances} />
        {content}
      </>
    )
  }

  listener (event) {
    switch (event.type) {
      case 'ADD_GAME_INSTANCE':
        this.addInstallation(event.data);
        break;
      default:
        break;
    }
  }
}
