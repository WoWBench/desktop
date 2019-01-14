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
    faUpload
} from '@fortawesome/free-solid-svg-icons'

library.add(fab, faTimes, faUpload);

// Watch the dom for font awesome icons to render.
import { dom } from '@fortawesome/fontawesome-svg-core'
dom.watch();

// Render the react application.
ReactDOM.render(
    <App />,
    document.getElementById('app')
);

class IPCSender {
    constructor (ipc) {
        this.ipc = ipc
    }

    send (event, message) {
        this.ipc.send(event, message);
    }

    handleEvent (event) {
        switch (event.type) {
            case 'VERIFY_GAME_INSTANCE':
                this.send('verify-game-instance', event.path);
                break;
            default:
                break;
        }
    }
}

// Dispatch events using IPC.
const ipcSender = new IPCSender(ipcRenderer);

ipcRenderer.on('add-game-instance', function (event, data) {
    GameInstanceActions.AddInstance(data);
});

dispatcher.register(ipcSender.handleEvent.bind(ipcSender));
