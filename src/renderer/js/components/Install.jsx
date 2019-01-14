import * as React from 'react'
import { ipcRenderer } from 'electron'
import { FileInput } from './Bulma/FileInput'
import * as GameInstanceActions from '../actions/GameInstanceActions';

export class Install extends React.Component {
  constructor(props) {
    super(props);
    this.addInstall = this.addInstall.bind(this)
  }

  // @ts-ignore
  addInstall (filesList) {
    let path = filesList[0].path;

    console.log('Adding game instance: ' + path);
    GameInstanceActions.VerifyInstance(path);
  }

  render () {
    // @ts-ignore
    let folderSelect = <FileInput change={ (e) => { this.addInstall(e) } } label="Select WoW Folder." />;

    // @ts-ignore
    return <>
      <h1>Welcome</h1>
      <p>In order to start, please locate the World of Warcraft installation folder.</p>
      {folderSelect}
    </>
  }
}