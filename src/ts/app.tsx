import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './components/App'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faTimes);

import { dom } from '@fortawesome/fontawesome-svg-core'
dom.watch();

ReactDOM.render(<App brandLogo={null} />, document.getElementById('app'));