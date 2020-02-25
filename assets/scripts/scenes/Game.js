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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.getChildByName('label').opacity = 255;
        this.node.on('select-card', this.onSelectCard, this);
        this.node.on('unselect-card', this.onUnSelectCard, this);
        this.node.on('card-selected', this.onCardSelected, this);
    },

    start () {
        let context = this;
        let data = {
            "type": "START",
            "gameId": "f810d64e-56d1-4909-af44-c4870dcc1252",
            "opponent": "ee310f39-cd46-4313-8cfc-530c36b7de86",
            "deck": ["sy", "oysg", "yqs", "zm", "qysnp", "wry", "thg", "bcg"],
            "cards": ["pl", "fqx", "zrl", "xyz", "blts", "hy", "ttzq", "jsh"]
        }

        context.node.getChildByName('label').opacity = 0;
        context.newCards.getComponent('newCards').initCards(data.deck);
        context.myCards.getComponent('MyCards').initCards(data.cards);
        context.opponentCards.getComponent('OpponentCards').initCards();

//        ws.send(JSON.stringify({
//            type: constants.events.PAIRING
//        }));
//
//        ws.onmessage = function (event) {
//            let data = JSON.parse(event.data);
//            console.log('---data---', data);
//            if(data.type === constants.events.START) {
//                context.node.getChildByName('label').opacity = 0;
//                context.newCards.getComponent('newCards').initCards(data.deck);
//                context.myCards.getComponent('MyCards').initCards(data.cards);
//                context.opponentCards.getComponent('OpponentCards').initCards();
//            }
//
//            if(data.type === constants.events.CARD_SELECTED) {
//            }
//        };
    },

    // update (dt) {},

    onDestroy() {
        this.node.off('select-card', this.onSelectCard, this);
        this.node.off('unselect-card', this.onUnSelectCard, this);
        this.node.off('card-selected', this.onCardSelected, this);
    }
});
