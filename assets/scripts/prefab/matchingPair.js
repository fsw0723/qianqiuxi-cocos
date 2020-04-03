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
        let chineseNames = [];

        pair.cards.forEach((cardName, i) => {
            let card = cc.instantiate(this.cardPrefab);

            card.x = 20*i;
            card.y = 0;
            card.anchorX = 0;
            card.anchorY = 1;
            card.zIndex = 100-i;
            card.scale = 0.8

            card.getComponent('card').loadCard(cardName);
            card.parent = context.node.getChildByName('cards');

            chineseNames.push(constants.cardNames[cardName].name);
        });

        this.node.getChildByName('card names').getComponent(cc.Label).string = chineseNames.join(',');
        this.node.getChildByName('name').getComponent(cc.Label).string = pair.name;
        this.node.getChildByName('points').getComponent(cc.Label).string = `${pair.points}分`;

    },

    onLoad: function() {
    },

    start () {

    },
});
