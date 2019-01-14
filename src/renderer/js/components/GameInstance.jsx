import React from 'react';
import dispatcher from '../dispatcher';

export class GameInstance extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      instance: {}
    }
    dispatcher.register(this.listener.bind(this));
  }

  listener (event) {
    switch (event.type) {
      case 'SELECT_INSTANCE':
        let instance = event.instance;
        this.setState({instance});
        break;
      default: break;
    }
  }

  render () {
    return <h1>Hello</h1>;
  }
}