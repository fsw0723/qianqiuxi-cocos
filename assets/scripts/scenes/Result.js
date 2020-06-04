const wsRequests = require('../utils/wsRequests');

cc.Class({
    extends: cc.Component,

    properties: {
        resultString: {
            default: null,
            type: cc.Node
        }
    },

    showResult(winner) {
        this.node.opacity = 255;
        if(winner === window.playerId) {
            this.resultString.getComponent(cc.Label).string = '胜利';
        } else {
            this.resultString.getComponent(cc.Label).string = '失败';
        }
    },

    newGame() {
        wsRequests.pairingRequest();
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
