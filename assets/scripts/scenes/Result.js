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
        this.node.active = true;
        if(winner === window.playerId) {
            this.resultString.getComponent(cc.Label).string = '胜利';
        } else {
            this.resultString.getComponent(cc.Label).string = '失败';
        }
    },

    newGame() {
        wsRequests.pairingRequest();
        this.node.active = false;
        this.node.dispatchEvent( new cc.Event.EventCustom('restart', true) );
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
