import * as React from 'react'
import { ipcRenderer } from 'electron'
import { FileInput } from './Bulma/FileInput'
import { GameManager } from "./WoWBench/GameManager";

type Props = {
  manager: GameManager
}

export class Install extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.addInstall = this.addInstall.bind(this)
  }

  // @ts-ignore
  addInstall (filesList) {
    let manager = this.props.manager;
    let path = filesList[0].path;

    console.log('Adding game instance: ' + path);
    manager.addInstance = manager.addInstance.bind(manager);
    manager.addInstance(path);
    ipcRenderer.send('add-game-install', {path});
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