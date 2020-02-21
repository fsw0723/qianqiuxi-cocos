const ws = require('../utils/webSocket');
const constants = require('../Constants');

cc.Class({
    extends: cc.Component,

    properties: {
        cardsLeft: [],
        playerA: {
            default: null,
            type: cc.Node
        },
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
        }
    },

    onSelectCard(event) {
        this.myCards.getComponent('MyCards').cards.forEach((card) => {
            if(card.getComponent('card').selected && card._id !== event.target._id) {
                card.getComponent('card').unselectCard();
            }
        })
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.getChildByName('label').opacity = 255;
        this.node.on('select-card', this.onSelectCard, this);
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

//        this.myCards.children.forEach((node, i) => {
//            node.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
//              console.log('Mouse down1', i);
//            }, this);
//        });
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
//        };
    },

    // update (dt) {},

    onDestroy() {
        this.node.off('select-card', this.onSelectCard, this);
    }
});
