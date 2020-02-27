cc.Class({
    extends: cc.Component,

    properties: {
        cardPrefab:{
            default: null,
            type: cc.Prefab
        }
    },

    loadPairImage(cardName, i) {
        let card = cc.instantiate(this.cardPrefab);
        if(i === 0) {
            card.x = -100;
        } else if (i === 1) {
            card.x = 100;
        }
        card.scale = 2;
        card.getComponent('card').loadCard(cardName);
        card.parent = this.node.getChildByName('cards');
    },

    loadPairText(pairName, score) {
        this.node.getChildByName('label').getComponent(cc.Label).string = `完成组对  ${pairName} !   获得额外分值 ${score} 分！`;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('card-selected', this.onCardSelected, this);
    },

    start () {

    },

    // update (dt) {},
});
