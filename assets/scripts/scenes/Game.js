const ws = require('../utils/websocket');
const constants = require('../Constants');

cc.Class({
    extends: cc.Component,

    properties: {
        cardsLeft: [],
        newCards: {
            default: null,
            type: cc.Node
        },
        myCards: {
            default: null,
            type: cc.Node
        },
        opponentCards: {
            default: null,
            type: cc.Node
        },
        selectedDeck: {
            default: null,
            type: cc.Node
        }
    },

    onSelectCard(event) {
        let selectedCardName = event.target.getComponent('card').cardName;
        this.myCards.children.forEach((card) => {
            if(card.getComponent('card').selected && card._id !== event.target._id) {
                card.getComponent('card').unselectCard();
            }
        });

        this.newCards.children.forEach((card) => {
            let cardName = card.getComponent('card').cardName;
            if(constants.cardNames[cardName] === constants.cardNames[selectedCardName]) {
                card.getComponent('card').isSelectable = true;
            } else {
                card.getComponent('card').isSelectable = false;
            }
        });
    },

    onUnSelectCard() {
        this.newCards.children.forEach((card) => {
            card.getComponent('card').isSelectable = false;
        });
    },

    onCardSelected() {
        this.newCards.getComponent('newCards').moveSelectedCard(this.selectedDeck);
        this.myCards.getComponent('MyCards').moveSelectedCard(this.selectedDeck);
//        this.newCards.getComponent('newCards').addCardToLast('blts');

    },

    init(data) {
        this.newCards.getComponent('newCards').initCards(data.deck);
        this.myCards.getComponent('MyCards').initCards(data.cards);
        this.opponentCards.getComponent('OpponentCards').initCards();
    },

    handleGameAction(data) {
        if(data.type === constants.events.CARD_SELECTED) {
            console.log('card selected');
            this.newCards.getComponent('newCards').addCardToLast(data.deck[9]);
            this.node.getChildByName('my score').getChildByName('points').getComponent(cc.Label).string = data.score;
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('select-card', this.onSelectCard, this);
        this.node.on('unselect-card', this.onUnSelectCard, this);
        this.node.on('card-selected', this.onCardSelected, this);
    },

    start () {

    },

    // update (dt) {},

    onDestroy() {
        this.node.off('select-card', this.onSelectCard, this);
        this.node.off('unselect-card', this.onUnSelectCard, this);
        this.node.off('card-selected', this.onCardSelected, this);
    }
});
