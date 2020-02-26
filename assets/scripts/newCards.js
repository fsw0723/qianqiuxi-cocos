cc.Class({
    extends: cc.Component,

    properties: {
       cardPrefab:{
            default: null,
            type: cc.Prefab
       }
    },

    moveSelectedCard(selectedDeck) {
        const finished = cc.callFunc(function(target) {
            window.selectedDeckCard.removeFromParent();
            window.selectedDeckCard.x = 0;
            window.selectedDeckCard.y = 0;
            window.selectedDeckCard.zIndex = selectedDeck.children.length*2 + 1;
            window.selectedDeckCard.parent = selectedDeck;
        }, this);

        let toMove = false;
        for(let i = this.node.children.length-1; i >= 0; i--) {
            let cardNode = this.node.children[i];
            if(cardNode._id === window.selectedDeckCard._id) {
                toMove = true;
                continue;
            }
            if(toMove) {
                cardNode.zIndex++;
                const cardAction = cc.moveBy(0.2, -50, 0);
                cardNode.runAction(cardAction);
            }
        }

        //TODO: Not hard code position
        const action = cc.sequence(cc.moveTo(0.5, cc.v2(-400, -210)), finished);
        window.selectedDeckCard.runAction(action);
    },

    addCardToLast: function(cardName) {
        let i = 9;
        let card = cc.instantiate(this.cardPrefab);
        card.x = -300+50*i;
        card.zIndex = 100-i;
        card.getComponent('card').loadCard(cardName);
        card.parent = this.node;
    },


    // LIFE-CYCLE CALLBACKS:

    initCards: function(cards) {
        for(let i = 0; i < cards.length; i++) {
            let card = cc.instantiate(this.cardPrefab);
            card.x = -300+50*i;
            card.zIndex = 100-i;
            card.getComponent('card').loadCard(cards[i]);
            card.parent = this.node;
        }
    },

    start: function() {

    }

});
