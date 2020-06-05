const constants = require('./Constants');

cc.Class({
    extends: cc.Component,

    properties: {
       cardPrefab:{
            default: null,
            type: cc.Prefab
       }
    },

    moveSelectedCard(selectedDeck, callback, isOwnCard) {
        let originalX = window.selectedDeckCard.x;
        const finished = cc.callFunc(function(target) {
            window.selectedDeckCard.removeFromParent();
            window.selectedDeckCard.x = 0;
            window.selectedDeckCard.y = 0;
            window.selectedDeckCard.zIndex = selectedDeck.children.length*2 + 1;
            window.selectedDeckCard.parent = selectedDeck;
            if(callback) {
                callback();
            }
        }, this);

        let toMove = false;
        for(let i = this.node.children.length-1; i >= 0; i--) {
            let cardNode = this.node.children[i];
            if(cardNode.x > originalX) {
                cardNode.zIndex++;
                const cardAction = cc.moveBy(0.2, -constants.cardWidth, 0);
                cardNode.runAction(cardAction);
            }
        }

        //TODO: Not hard code position
        let action;
        if(isOwnCard) {
            action = cc.sequence(cc.moveTo(0.5, cc.v2(-400, -210)), finished);
        } else {
            action = cc.sequence(cc.moveTo(0.5, cc.v2(-400, 210)), finished);
        }
        window.selectedDeckCard.runAction(action);
    },

    addCardToLast: function(cardName, index) {
        let card = cc.instantiate(this.cardPrefab);
        card.x = -250+constants.cardWidth*index;
        card.zIndex = 100-index;
        card.getComponent('card').loadCard(cardName);
        card.parent = this.node;
    },

    setMatchingCardsSelectable: function(selectedCardName) {
        this.node.children.forEach((card) => {
            let cardName = card.getComponent('card').cardName;
            if(constants.cardNames[cardName].season === constants.cardNames[selectedCardName].season) {
                card.getComponent('card').isSelectable = true;
            } else {
                card.getComponent('card').isSelectable = false;
            }
        });
    },

    setAllCardsUnselectable: function() {
        this.node.children.forEach((card) => {
            card.getComponent('card').isSelectable = false;
        });
    },

    initCards: function(cards) {
        for(let i = 0; i < cards.length; i++) {
            let card = cc.instantiate(this.cardPrefab);
            card.x = -250+constants.cardWidth*i;
            card.zIndex = 100-i;
            card.getComponent('card').loadCard(cards[i]);
            card.parent = this.node;
        }
    },

    // LIFE-CYCLE CALLBACKS
    start: function() {

    }

});
