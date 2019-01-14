const dispatcher = require('../dispatcher');

/**
 * Recieve request to verify game instance from front end.
 * @param path
 * @constructor
 */
module.exports.VerifyInstance = function(instance, sender) {
  dispatcher.dispatch({
    type: 'VERIFY_GAME_INSTANCE',
    instance,
    sender
  });
}

/**
 * Refresh a game instance (update lists).
 * @param path
 * @constructor
 */
module.exports.RefreshInstance = function (instance) {
  dispatcher.dispatch({
    type: 'REFRESH_GAME_INSTANCE',
    instance
  });
}