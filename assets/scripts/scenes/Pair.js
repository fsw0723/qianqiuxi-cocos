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

    show(data, index) {
        let pair = data.newPairs[index];
        let context = this;

        this.node.active = true;
        pair.cards.forEach((cardName, i) => {
            this.node.getComponent('Pair').loadPairImage(cardName, i);
        });
        this.node.getComponent('Pair').loadPairText(pair.name, pair.points);
        setTimeout(function() {
            context.node.active = false;
            context.node.getChildByName('cards').children.forEach((card) => {
                card.destroy();
            });
        }, 1700);
    },

    stopPropagation(e) {
        e.stopPropagation();
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.stopPropagation);
    },

    start () {

    },

    // update (dt) {},
    onDestroy() {
        context.node.off(cc.Node.EventType.TOUCH_START, this.stopPropagation);
    }
});
