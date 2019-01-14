const dispatcher = require('../dispatcher');

/**
 * Recieve request to verify game instance from front end.
 * @param path
 * @constructor
 */
module.exports.VerifyInstance = function(path, sender) {
  dispatcher.dispatch({
    type: 'VERIFY_GAME_INSTANCE',
    path,
    sender
  });
}
