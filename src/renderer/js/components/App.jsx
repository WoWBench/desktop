import * as React from 'react'
import { Navbar } from './Bulma/Navbar';
import { WindowActions } from './WindowActions'
import { Install } from "./Install";
import { GameInstance } from './GameInstance'
import { InstanceSelector } from './InstanceSelector';
import dispatcher from '../dispatcher';
import * as GameInstanceActions from '../actions/GameInstanceActions';

const store = window.localStorage;

console.log(GameInstanceActions);

export class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      instance_count: 0,
      instances: {},
      showingAddInstanceForm: false,
    }
  }

  getInstanceCounter () {
    let installs = store.getItem('instance_count');
    if (installs === null) {
      return 0;
    }

    return installs;
  }

  /**
   * Add an installation to localStorage and App State.
   * @param installation
   */
  addInstallation (installation) {
    let instance_number;
    if (typeof installation.instance_number === "undefined") {
      let instance_number = this.getInstanceCounter();
      instance_number++;

      installation.instance_number = instance_number;
      store.setItem('instance_count', instance_number);
      this.setState({instance_count: instance_number});
    } else {
      instance_number = installation.instance_number;
    }

    // Store in local storage to remember on future loads.
    let instances = this.state.instances;
    store.setItem('instance_' + instance_number, JSON.stringify(installation));
    instances[instance_number] = installation;

    // Set the react app state.
    let stateObject = {
      instances,
      showingAddInstanceForm: false
    }

    this.setState(stateObject);
  }

  componentDidMount () {
    dispatcher.register(this.listener.bind(this));

    let installs = this.getInstanceCounter();

    // Reload game instances from local storage then ask node to refresh their info.
    let instances = {}
    let instance_counter = 0;

    if (installs > 0) {
      // Refresh game instances.
      for (let i = 0; i < installs; i++) {
        // Get the data from lStorage.
        let y = i+1;
        let instance = store.getItem('instance_' + y);

        if (instance) {
          if (typeof instance === "string") {
            instance = JSON.parse(instance);
          }
          instances[instance.instance_number] = instance
          instance_counter++;
          GameInstanceActions.UpdateInstance(instance);
          if (y === installs) {
            GameInstanceActions.SelectInstance(instance);
          }
        }
      }
      this.setState({instances: instances, instance_count: instance_counter});
    }
  }

  content () {
    const { instance_count } = this.state;

    if (instance_count < 1 || this.state.showingAddInstanceForm) {
      return <Install />
    }
    return (
      <GameInstance />
    )
  }

  render () {
    let content = this.content();
    let instances = this.state.instances;
    let instance_count = this.state.instance_count;

    return (
      <>
        <Navbar brand="WoWBench" />
        <WindowActions/>
        <InstanceSelector instance_count={instance_count} instances={instances} />
        <div id="content">
          {content}
        </div>
      </>
    )
  }

  listener (event) {
    switch (event.type) {
      case 'ADD_GAME_INSTANCE':
        this.addInstallation(event.instance);
        break;
      case 'SHOW_ADD_INSTANCE_FORM':
        this.setState({showingAddInstanceForm: true});
        break;
      case 'HIDE_ADD_INSTANCE_FORM':
        this.setState({showingAddInstanceForm: false});
      default:
        break;
    }
  }
}
