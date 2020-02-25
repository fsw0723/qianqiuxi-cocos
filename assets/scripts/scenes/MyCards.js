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
            card.x = -300+50*i;
            card.zIndex = 100-i;
            card.getComponent('card').loadCard(cards[i]);
            card.parent = this.node;
            card.getComponent('card').isSelectable = true;
        }
    },

    moveSelectedCard(selectedDeck) {
        const finished = cc.callFunc(function(target) {
            window.selectedOwnCard.removeFromParent();
            window.selectedOwnCard.x = 0;
            window.selectedOwnCard.y = 0;
            window.selectedOwnCard.zIndex = selectedDeck.children.length*2;
            window.selectedOwnCard.parent = selectedDeck;
        }, this);

        const action = cc.sequence(cc.moveTo(0.5, cc.v2(-400, 0)), finished);

        let toMove = false;
        for(let i = this.node.children.length-1; i >= 0; i--) {
            let cardNode = this.node.children[i];
            if(cardNode._id === window.selectedOwnCard._id) {
                toMove = true;
            }
            if(toMove) {
                const cardAction = cc.moveBy(0.2, -50, 0);
                cardNode.runAction(cardAction);
            }
        }

        window.selectedOwnCard.runAction(action);
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('card-selected', this.onCardSelected, this);
    },

    start () {

    },

    // update (dt) {},
    onDestroy() {
        this.node.off('card-selected', this.onCardSelected, this);
    }
});
