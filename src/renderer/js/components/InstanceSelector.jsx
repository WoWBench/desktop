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

  selectInstance(e) {
    GameInstanceActions.SelectInstance(e.target);
    GameInstanceActions.HideAddInstanceForm();
  }

  instanceButton(instance) {
    console.log(instance);
    return <button key={instance.instance_number} className="button instance-selection" onClick={this.selectInstance}>
      W{instance.instance_number}
    </button>;
  }

  instanceButtons() {
      let instances = this.props.instances;
      return Object.keys(instances).map(i => {
        return this.instanceButton(instances[i]);
      });
  }

  addInstanceButton() {
    if (!this.hasInstances()) {
      return <button className="button add-instance" onClick={this.showAddInstanceForm}>
        <FontAwesomeIcon icon="plus" />
      </button>;
    }
    return '';
  }

  render () {
    let addButton = this.addInstanceButton();
    let instanceButtons = this.instanceButtons();

    return <div id="instance-selector">
      {instanceButtons}
      {addButton}
    </div>;
  }
}