import * as React from 'react'
import { Navbar } from './Bulma/Navbar';
import { WindowActions } from './WindowActions'
import { Install } from "./Install";
import { InstanceSelector } from './InstanceSelector';
import dispatcher from '../dispatcher';

const store = window.localStorage;

export class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      instances: null
    }
  }

  getInstanceCounter () {
    let installs = store.getItem('instances');
    if (installs === null) {
      return 0;
    }

    return installs;
  }

  /**
   * Add an installation to localStorage and App State.
   * @param installation
   * @param instance_number
   */
  addInstallation (installation, instance_number = 0) {
    if (instance_number === 0) {
      instance_number = this.getInstanceCounter();
    }

    instance_number++;
    let instanceKey = 'instance_' + instance_number;

    // Store in local storage to remember on future loads.
    store.setItem('instances', instance_number);
    store.setItem(instanceKey, installation);

    // Set the react app state.
    let stateObject = {
      instances: instance_number,
    }

    stateObject[instanceKey] = installation;
    this.setState(stateObject);
  }

  componentDidMount () {
    dispatcher.register(this.listener.bind(this));

    let installs = this.getInstanceCounter();

    if (installs > 0) {
      // Refresh game instances.
      // for (let i = 0; i < installs; i++) {
      //
      // }
    }
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
        <InstanceSelector instances={instances} />
        <div id="content">
          {content}
        </div>
      </>
    )
  }

  listener (event) {
    switch (event.type) {
      case 'ADD_GAME_INSTANCE':
        this.addInstallation(event.data, event.instance_number);
        break;
      default:
        break;
    }
  }
}
