cc.Class({
    extends: cc.Component,

    properties: {
        cardPrefab:{
            default: null,
            type: cc.Prefab
        },
        cards: []
    },

    onTouchStart() {
        this.node.parent.parent.getChildByName('overlay').getComponent('Overlay').mode = 'OPPONENT';
        this.node.parent.parent.getChildByName('overlay').active = true;
        this.node.parent.active = false;
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    },

    start () {

    },

    // update (dt) {},
    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    }
});
