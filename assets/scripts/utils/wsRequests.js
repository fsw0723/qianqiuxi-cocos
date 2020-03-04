const ws = require('./websocket');
const constants = require('../Constants');

module.exports.discardCardRequest = function(discardCardName) {
    window.ws.send(JSON.stringify({
        type: constants.events.DISCARD_CARD,
        playerId: window.playerId,
        cardToDiscard: discardCardName
    }));
};

module.exports.selectCardRequest = function(selectedCardFromDeck, selectedOwnCard) {
    window.ws.send(JSON.stringify({
        type: constants.events.SELECT_CARD,
        playerId: window.playerId,
        selectedCardFromDeck,
        selectedOwnCard
    }));
};

module.exports.pairingRequest = function() {
    window.ws.send(JSON.stringify({
        type: constants.events.PAIRING
    }));
};

