import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'

export class WindowActions extends React.Component {
  render () {
    return (
      <div className="window-actions">
        <button onClick={close}><FontAwesomeIcon icon="times" size="1x" /></button>
      </div>
    )
  }
}
