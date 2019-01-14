import dispatcher from '../dispatcher'

/**
 * Send Installation path to node to verify validity.
 * @param {*} path 
 */
export function VerifyInstance (path) {
    dispatcher.dispatch({
        type: 'VERIFY_GAME_INSTANCE',
        path
    });
}

/**
 * Add Game Instance to WoWBench (Front End).
 * @param data
 */
export function AddInstance (data) {
    dispatcher.dispatch({
        type: 'ADD_GAME_INSTANCE',
        data
    });
}

