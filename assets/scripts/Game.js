const CardModel = require('CardModel');
const ws = require('./utils/webSocket');
const constants = require('./Constants');

cc.Class({
    extends: cc.Component,

    properties: {
        cardsLeft: [],
        playerA: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.cardsLeft.push(new CardModel('ar2'));

        ws.send(JSON.stringify({
            type: constants.events.INIT_CARDS
        }));
    },

    start () {

    },

    // update (dt) {},
});
