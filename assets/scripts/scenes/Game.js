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
        },
        opponentSelectedDeck: {
            default: null,
            type: cc.Node
        }
    },

    clear() {
        this.newCards.removeAllChildren();
        this.myCards.removeAllChildren();
        this.opponentCards.removeAllChildren();
        this.selectedDeck.removeAllChildren();
        this.opponentSelectedDeck.removeAllChildren();
        this.node.getChildByName('left panel label').opacity = 0;
        this.node.getChildByName('my score').getChildByName('points').getComponent(cc.Label).string = 0;
        this.node.getChildByName('opponent score').getChildByName('points').getComponent(cc.Label).string = 0;
        this.node.getChildByName('my score').getChildByName('arrow').opacity = 0;
        this.node.getChildByName('opponent score').getChildByName('arrow').opacity = 0;

        window.mySelectedCards = [];
        window.opponentSelectedCards = [];
        window.myPairs = [];
        window.opponentPairs = [];
        window.discardingCard = false;
        window.selectedDeckCard = null
        window.selectedOwnCard = null;
    },

    init(data) {
        this.clear();

        this.newCards.getComponent('newCards').initCards(data.deck);
        this.myCards.getComponent('MyCards').initCards(data.cards);
        this.opponentCards.getComponent('OpponentCards').initCards();

        if(data.turn === window.playerId) {
            this.myCards.getComponent('MyCards').setAllCardsSelectable();
            this.node.getChildByName('my score').getChildByName('arrow').opacity = 255;
        } else {
            this.node.getChildByName('opponent score').getChildByName('arrow').opacity = 255;
        }
    },

    onSelectCard(event) {
        let selectedCardName = event.target.getComponent('card').cardName;
        this.myCards.children.forEach((card) => {
            if(card.getComponent('card').selected && card._id !== event.target._id) {
                card.getComponent('card').unselectCard();
            }
        });

        this.newCards.getComponent('newCards').setMatchingCardsSelectable(selectedCardName);
    },

    onUnSelectCard() {
        this.newCards.getComponent('newCards').setAllCardsUnselectable();
    },

    onCardSelected() {
        this.newCards.getComponent('newCards').moveSelectedCard(this.selectedDeck, null, true);
        this.myCards.getComponent('MyCards').moveSelectedCard(this.selectedDeck);
    },

    showPair: function(data) {
        // 显示成功的配对，如果有多对显示，每2S显示一个
        if(data.newPairs.length) {
            let index = 0;
            let pairNode = this.node.getChildByName('pair');
            index++;

             this.scheduleOnce(function() {
                 pairNode.getComponent('Pair').show(data, 0);
             }, 0);

            if(data.newPairs.length > 1) {
                this.schedule(function() {
                    pairNode.getComponent('Pair').show(data, index);
                    index++;
                }, 2, data.newPairs.length-2, 0);
            }
        }
    },

    handleCardSelected: function(data) {
        console.log('card selected');
        this.newCards.getComponent('newCards').addCardToLast(data.deck[data.deck.length-1], data.deck.length-1);

        this.node.getChildByName('my score').getChildByName('points').getComponent(cc.Label).string = data.score;
        this.node.getChildByName('my score').getChildByName('arrow').opacity = 0;
        this.node.getChildByName('opponent score').getChildByName('arrow').opacity = 255;

        this.showPair(data);

        window.myPairs = [...window.myPairs, ...data.newPairs];
    },

    discardCard: function(data) {
        let requireDiscardCard = this.myCards.getComponent('MyCards').checkRequireDiscardCard(data);
        if(requireDiscardCard) {
            console.log('require discard card');
            this.node.getChildByName('left panel label').opacity = 255;
            window.discardingCard = true;
        } else {
            this.node.getChildByName('left panel label').opacity = 0;
        }
    },

    handleOpponentCardSelected: function(data) {
        console.log('opponent card selected');
        this.newCards.children.forEach((cardNode) => {
            if(cardNode.getComponent('card').cardName === data.opponentSelectedDeckCard) {
                window.selectedDeckCard = cardNode;
            }
        });
        let context = this;
        let callback = function() {
            context.newCards.getComponent('newCards').addCardToLast(data.deck[data.deck.length-1], data.deck.length-1);
            context.myCards.getComponent('MyCards').setAllCardsSelectable();
            context.opponentCards.getComponent('OpponentCards').removeCardFromEnd();
        };
        this.newCards.getComponent('newCards').moveSelectedCard(this.opponentSelectedDeck, callback, false);

        //Update score and arrow
        this.node.getChildByName('opponent score').getChildByName('points').getComponent(cc.Label).string = data.opponentScore;
        this.node.getChildByName('opponent score').getChildByName('arrow').opacity = 0;
        this.node.getChildByName('my score').getChildByName('arrow').opacity = 255;

        this.showPair(data);

        this.discardCard(data);
        window.opponentSelectedCards.push(data.opponentSelectedDeckCard);
        window.opponentSelectedCards.push(data.opponentSelectedOwnCard);

        window.opponentPairs = [...window.opponentPairs, ...data.newPairs];
    },

    handleCardDiscarded(data) {
        let i = data.cards.length-1;
        this.myCards.getComponent('MyCards').addCard(data.newCard, i);
        this.myCards.getComponent('MyCards').setAllCardsSelectable();
        this.discardCard(data);
    },

    handleOpponentCardDiscarded(data) {
        this.newCards.getComponent('newCards').addCardToLast(data.cardDiscarded, data.deck.length-1);
    },

    checkGameOver(data) {
//        this.node.getChildByName('result').getComponent('Result').showResult(window.playerId);
        if(data.isGameOver === true) {
            console.log('Game over!');
            this.node.getChildByName('result').getComponent('Result').showResult(data.winner);
        }
    },

    handleGameAction(data) {
        if(data.type === constants.events.CARD_SELECTED || data.type === constants.events.OPPONENT_CARD_SELECTED) {
            this.checkGameOver(data);
        }
        if(data.type === constants.events.CARD_SELECTED) {
            this.handleCardSelected(data);
        }
        if(data.type === constants.events.OPPONENT_CARD_SELECTED) {
            this.handleOpponentCardSelected(data);
        }
        if(data.type === constants.events.CARD_DISCARDED) {
            this.handleCardDiscarded(data);
        }

        if(data.type === constants.events.OPPONENT_CARD_DISCARDED) {
            this.handleOpponentCardDiscarded(data);
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
