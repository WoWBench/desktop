import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './components/App'
import dispatcher from './dispatcher';
import * as GameInstanceActions from './actions/GameInstanceActions';
import { ipcRenderer } from 'electron';

// Add font awesome.
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faTimes,
  faUpload,
  faPlus,
  faCircle,
} from '@fortawesome/free-solid-svg-icons'

library.add(fab, faTimes, faUpload, faPlus, faCircle);

// Watch the dom for font awesome icons to render.
import { dom } from '@fortawesome/fontawesome-svg-core'
dom.watch();

// Load the event systems
class IPCSender {
    constructor (ipc) {
        this.ipc = ipc
    }

    send (event, message) {
        this.ipc.send(event, message);
    }

    handleEvent (event) {
        switch (event.type) {
            case 'REFRESH_GAME_INSTANCE':
                this.send('refresh-game-instance', event.instance);
                break;
            case 'VERIFY_GAME_INSTANCE':
                this.send('verify-game-instance', event.instance);
                break;
            default:
                break;
        }
    }
}

// Dispatch events using IPC.
const ipcSender = new IPCSender(ipcRenderer);

ipcRenderer.on('add-game-instance', function (event, instance) {
    GameInstanceActions.AddInstance(instance);
});

dispatcher.register(ipcSender.handleEvent.bind(ipcSender));

// Render the react application. (This has to be last otherwise events from mount wont be caught).
ReactDOM.render(
    <App />,
    document.getElementById('app')
);
