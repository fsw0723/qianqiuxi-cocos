const ws = require('./websocket');
const constants = require('../Constants');

module.exports.discardCardRequest = function(discardCardName) {
    ws.send(JSON.stringify({
        type: constants.events.DISCARD_CARD,
        playerId: window.playerId,
        cardToDiscard: discardCardName
    }));
};