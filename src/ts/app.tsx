import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './components/App'

// Add font awesome.
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
    faTimes,
    faUpload
} from '@fortawesome/free-solid-svg-icons'

library.add(fab, faTimes, faUpload);

// Watch the dom for font awesome icons to render.
import { dom } from '@fortawesome/fontawesome-svg-core'
dom.watch();

import { GameManager } from "./components/WoWBench/GameManager";
let manager = new GameManager();

// Render the react application.
ReactDOM.render(
    <App brandLogo={null} manager={manager} />,
    document.getElementById('app')
);