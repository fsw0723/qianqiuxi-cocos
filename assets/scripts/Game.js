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
        },
        newCards: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start () {
        let context = this;

        ws.send(JSON.stringify({
            type: constants.events.PAIRING
        }));

        ws.onmessage = function (event) {
            let data = JSON.parse(event.data);
            if(data.type === constants.events.START) {
                context.node.getChildByName('label').opacity = 0;
                context.newCards.getComponent('newCards').initCards(data.deck);
            }
        };
    },

    // update (dt) {},
});
