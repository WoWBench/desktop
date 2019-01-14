import dispatcher from '../dispatcher'

/**
 * Send Installation path to node to verify validity.
 * @param {*} path 
 */
export function VerifyInstance (path) {
    dispatcher.dispatch({
        type: 'VERIFY_GAME_INSTANCE',
        instance: {
            path
        }
    });
}

/**
 * Refresh a game instance (update lists).
 * @param instance
 * @constructor
 */
export function UpdateInstance (instance) {
    console.log('dispatching update instance as REFRESH_GAME_INSTANCE with', instance);
    dispatcher.dispatch({
        type: 'REFRESH_GAME_INSTANCE',
        instance
    });
}

/**
 * Add Game Instance to WoWBench (Front End).
 * @param instance
 */
export function AddInstance (instance) {
    dispatcher.dispatch({
        type: 'ADD_GAME_INSTANCE',
        instance
    });
}

export function ShowAddInstanceForm () {
    dispatcher.dispatch({
        type: 'SHOW_ADD_INSTANCE_FORM'
    })
}