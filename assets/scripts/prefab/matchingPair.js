const wsRequests = require('../utils/wsRequests');
const constants = require('../Constants');

cc.Class({
    extends: cc.Component,

    properties: {
        cardPrefab:{
            default: null,
            type: cc.Prefab
        }
    },

    load: function(pair) {
        let context = this;

        pair.cards.forEach((cardName, i) => {
            let card = cc.instantiate(this.cardPrefab);

            card.x = 20*i;
            card.y = 0;
            card.anchorX = 0;
            card.anchorY = 1;
            card.zIndex = 100-i;

            card.getComponent('card').loadCard(cardName);
            card.parent = context.node.getChildByName('cards');
        });
    },

    onLoad: function() {
    },

    start () {

    },
});
