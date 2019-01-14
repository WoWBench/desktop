import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as GameInstanceActions from '../actions/GameInstanceActions';

export class InstanceSelector extends React.Component {
  constructor (props) {
    super(props);
    this.showAddInstanceForm = this.showAddInstanceForm.bind(this);
  }

  showAddInstanceForm(e) {
    e.preventDefault();
    GameInstanceActions.ShowAddInstanceForm();
  }

  hasInstances () {
    let i = this.props.instances.length;

    //return !!i;
    // DEBUG always show add instances button
    return false;
  }

  addInstanceButton() {
    if (!this.hasInstances()) {
      return <button className="button" onClick={this.showAddInstanceForm}>
        <FontAwesomeIcon icon="plus" />
      </button>;
    }
    return '';
  }

  render () {
    let addButton = this.addInstanceButton();

    let i = this.props.instances;
    let instanceButtons;

    if (typeof this.props.instance_count !== "undefined") {
      let iCount = this.props.instance_count;
      instanceButtons = '1';
    }

    return <div id="instance-selector">
      {instanceButtons}
      {addButton}
    </div>;
  }
}