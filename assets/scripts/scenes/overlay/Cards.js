cc.Class({
    extends: cc.Component,

    properties: {
        cardWithPointsPrefab:{
            default: null,
            type: cc.Prefab
        }
    },

    initCards: function(cards) {
//        window.mySelectedCards = ['ar', 'blts', 'tyc', 'hyue', 'yd', 'fls', 'jt', 'lyc', 'xyz']
        this.node.removeAllChildren();
        for(let i = 0; i < cards.length; i++) {
            let card = cc.instantiate(this.cardWithPointsPrefab);
            card.x = 80*(i%7);
            card.y = -Math.floor(i/7)*150;
            card.getComponent('cardWithPoints').loadCard(cards[i]);
            card.parent = this.node;
        }
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {

    },

    // update (dt) {},
});
