cc.Class({
    extends: cc.Component,

    properties: {
         cardBackPrefab:{
            default: null,
            type: cc.Prefab
         }
    },

    initCards: function(cards) {
        for(let i = 0; i <= 8; i++) {
            let card = cc.instantiate(this.cardBackPrefab);
            card.setPosition(50*i, 0);
            card.parent = this.node;
        }
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
