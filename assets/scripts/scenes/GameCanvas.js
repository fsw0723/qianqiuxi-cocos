const ws = require('../utils/websocket');
const constants = require('../Constants');

cc.Class({
    extends: cc.Component,

    properties: {
        game: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.getChildByName('label').opacity = 255;
    },

    start () {
        let context = this;
        context.game.opacity = 0;
//        let data = {
//            "type": "START",
//            "gameId": "f810d64e-56d1-4909-af44-c4870dcc1252",
//            "opponent": "ee310f39-cd46-4313-8cfc-530c36b7de86",
//            "deck": ["sy", "oysg", "yqs", "zm", "qysnp", "wry", "thg", "bcg", 'hyue', 'xl'],
//            "cards": ["pl", "fqx", "zrl", "xyz", "blts", "hy", "ttzq", "jsh"]
//        }
//
//                context.node.getChildByName('label').opacity = 0;
//                context.game.opacity = 255;
//                context.game.getChildByName('pair').getComponent('Pair').loadPairImage('ar', 0);
//                context.game.getChildByName('pair').getComponent('Pair').loadPairImage('blts', 1);
//                context.game.getChildByName('pair').getComponent('Pair').loadPairText('永相随', 3);

        ws.send(JSON.stringify({
            type: constants.events.PAIRING
        }));

        ws.onmessage = function (event) {
            let data = JSON.parse(event.data);
            console.log('---message---', data);
            if(data.type === constants.events.START) {
                context.node.getChildByName('label').opacity = 0;
                context.game.opacity = 255;
                context.game.getComponent('Game').init(data);
            }

            context.game.getComponent('Game').handleGameAction(data);
        };
    },

    // update (dt) {},
});
