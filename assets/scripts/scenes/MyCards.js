const constants = require('../Constants');

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
            card.x = -250+50*i;
            card.zIndex = 100-i;
            card.getComponent('card').loadCard(cards[i]);
            card.parent = this.node;
        }
    },

    setAllCardsUnselectable: function() {
        this.node.children.forEach((card) => {
            card.getComponent('card').isSelectable = false;
        });
    },

    setAllCardsSelectable: function() {
        this.node.children.forEach((card) => {
            card.getComponent('card').isSelectable = true;
        });
    },

    moveCardsToLeft(selectedCard) {
        let originalX = selectedCard.x;
        for(let i = this.node.children.length-1; i >= 0; i--) {
            let cardNode = this.node.children[i];

            if(cardNode.x > originalX) {
                const cardAction = cc.moveBy(0.2, -50, 0);
                cardNode.zIndex++;
                cardNode.runAction(cardAction);
            }
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

        this.moveCardsToLeft(window.selectedOwnCard);

        window.selectedOwnCard.runAction(action);
    },

    checkRequireDiscardCard: function(data) {
        let seasons = [];
        this.node.children.forEach((card) => {
            let season = constants.cardNames[card.getComponent('card').cardName].season;
            if(seasons.indexOf(season) === -1) {
                seasons.push(season);
            }
        });

        for(let i = 0; i < data.deck.length; i++) {
            let deckCard = data.deck[i];
            if(seasons.indexOf(constants.cardNames[deckCard].season) > -1) {
                console.log('No need to discard');
                return false;
            }
        }
        console.log('Need to discard');
        return true;
    },

    addCard(cardName, i) {
        let card = cc.instantiate(this.cardPrefab);
        card.x = -250+50*i;
        card.zIndex = 100-i;
        card.getComponent('card').loadCard(cardName);
        card.parent = this.node;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {

    },

    // update (dt) {},
    onDestroy() {
    }
});
