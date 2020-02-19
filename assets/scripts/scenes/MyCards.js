cc.Class({
    extends: cc.Component,

    properties: {
        cardPrefab:{
            default: null,
            type: cc.Prefab
        }
    },

    initCards: function(cards) {
        for(let i = 0; i < cards.length; i++) {
            let card = cc.instantiate(this.cardPrefab);
            card.x = -300+70*i;
            card.getComponent('card').loadCard(cards[i]);
            card.parent = this.node;
        }
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
