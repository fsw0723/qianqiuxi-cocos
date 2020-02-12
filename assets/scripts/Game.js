const CardModel = require('CardModel');
const ws = require('./utils/webSocket');

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

        setTimeout(function () {
            console.log('Timeout')
            if (ws.readyState === WebSocket.OPEN) {
                ws.send("InitCards");
            }
            else {
                console.log("WebSocket instance wasn't ready...");
            }
         }, 3000);
    },

    start () {

    },

    // update (dt) {},
});
