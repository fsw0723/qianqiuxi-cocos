cc.Class({
    extends: cc.Component,

    properties: {
        cardWithPointsPrefab:{
            default: null,
            type: cc.Prefab
        },
        cards: {
            default: null,
            type: cc.Node
        }
    },

    onClickBack() {
        this.node.parent.getChildByName('game').active = true;
        this.node.active = false;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.cards.getComponent('Cards').initCards();
    },

    start () {

    },

    // update (dt) {},
});
