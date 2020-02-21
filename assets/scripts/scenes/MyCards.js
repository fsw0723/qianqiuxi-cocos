cc.Class({
    extends: cc.Component,

    properties: {
        cardPrefab:{
            default: null,
            type: cc.Prefab
        },
        cards: []
    },

    initCards: function(cards) {
        for(let i = 0; i < cards.length; i++) {
            let card = cc.instantiate(this.cardPrefab);
            card.x = -300+70*i;
            card.getComponent('card').loadCard(cards[i]);
            card.parent = this.node;
            this.cards.push(card);
        }
    },

    // LIFE-CYCLE CALLBACKS:

    start () {

    },

    // update (dt) {},
});
