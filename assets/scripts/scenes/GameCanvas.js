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

    onStart() {
        this.node.getChildByName('pairing').active = true;

        let context = this;
        context.game.opacity = 0;
        wsRequests.pairingRequest();

        window.ws.onmessage = function (event) {
            let data = JSON.parse(event.data);
            console.log(`[${new Date()}] WS data received`, data);
            if(data.type === constants.events.START) {
                context.node.getChildByName('pairing').active = false;
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

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('restart', this.onStart, this);
    },

    start () {
        this.onStart();
    },

    // update (dt) {},
});
