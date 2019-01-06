import * as React from 'react'

export class Install extends React.Component {
  addInstall () {

  }

  render () {
    // @ts-ignore
    let folderSelect = <input type="file" webkitdirectory="" />;

    // @ts-ignore
    return <>
      <h1>Welcome</h1>
      <p>In order to start, please locate the World of Warcraft installation folder.</p>
      {folderSelect}
    </>
  }
}