const constants = require('../Constants');
const wsRequests = require('../utils/wsRequests');

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
//        context.node.getChildByName('label').opacity = 0;
//        context.game.opacity = 255;
//        context.game.getComponent('Game').init(data);
//        context.game.getComponent('Game').handleGameAction(data);

        wsRequests.pairingRequest();

        window.ws.onmessage = function (event) {
            let data = JSON.parse(event.data);
            console.log(`[${new Date()}] WS data received`, data);
            if(data.type === constants.events.START) {
                context.node.getChildByName('label').opacity = 0;
                context.game.opacity = 255;
                context.game.getComponent('Game').init(data);
            }

            context.game.getComponent('Game').handleGameAction(data);
        };

        window.ws.onclose = function (event) {
            console.log("WebSocket instance closed.", new Date());

            let notificationNode = context.node.getChildByName('notification');
            notificationNode.active = true;
            notificationNode.getChildByName('message').getComponent(cc.Label).string = '已掉线';
        };
    },

    // update (dt) {},
});
