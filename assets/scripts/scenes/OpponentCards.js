cc.Class({
    extends: cc.Component,

    properties: {
         cardBackPrefab:{
            default: null,
            type: cc.Prefab
         }
    },

    initCards: function() {
        for(let i = 0; i < 10; i++) {
            let card = cc.instantiate(this.cardBackPrefab);
            card.setPosition(50*i, 0);
            card.zIndex = 100-i;
            card.parent = this.node;
        }
    },

    removeCardFromEnd() {
        let card = this.node.children[0];
        card.parent = null;
        card.destroy();
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
