const wsRequests = require('../utils/wsRequests');
const Constants = require('../Constants');

cc.Class({
    extends: cc.Component,

    properties: {
        selected: false,
        isSelectable: false,
        isOnHover: false,
        cardName: ''
    },

    loadCard: function(cardName) {
        let context = this;
        cc.loader.load({url: `${Constants.imagesUrl}/${cardName}.jpg`, type: "jpeg"}, (err, tex)=>{
            if(err){
                cc.error(err);
            } else{
                let spf = new cc.SpriteFrame(tex);
                let sp = context.getComponent(cc.Sprite);
                sp.spriteFrame = spf;
                this.cardName = cardName;
            }
        });
    },

    handleCardSelected() {
        wsRequests.selectCardRequest(this.cardName, window.selectedOwnCard.getComponent('card').cardName);
        window.mySelectedCards.push(this.cardName);
        window.mySelectedCards.push(window.selectedOwnCard.getComponent('card').cardName);

        this.node.parent.parent.getChildByName('my cards').getComponent('MyCards').setAllCardsUnselectable();
        this.node.parent.parent.getChildByName('new cards').getComponent('newCards').setAllCardsUnselectable();
        this.node.dispatchEvent( new cc.Event.EventCustom('card-selected', true) );
    },

    discardCard() {
        let myCardsNode = this.node.parent.getComponent('MyCards');
        let deckNode = this.node.parent.parent.getChildByName('new cards');

        // Send WS request
        wsRequests.discardCardRequest(this.cardName);
        // Move card to deck
        let positionX = this.node.parent.parent.getChildByName('new cards').children[0].getPosition().x + Constants.cardWidth;
        const cb = cc.callFunc(function(target) {
            this.node.parent = deckNode;
            this.node.y = 0;
        }, this);
        const action = cc.sequence(cc.moveTo(0.5, cc.v2(positionX, 210)), cb);
        this.node.runAction(action);
        // Move all own cards after selected to left
        myCardsNode.moveCardsToLeft(this.node);

        this.node.zIndex = 100-deckNode.children.length;
        this.isOnHover = false;
        this.selected = false;
        window.discardingCard = false;
        myCardsNode.setAllCardsUnselectable();
    },

    selectCard() {
//        window.discardingCard = true;
        if(window.discardingCard && this.node.parent.name === 'my cards') {
            this.discardCard()
        }
        else if(this.isSelectable) {
            if(this.node.parent.name === 'new cards') {
                window.selectedDeckCard = this.node;
                this.handleCardSelected();
            } else {
                if(this.isOnHover) {
                    this.node.y += 10;
                } else {
                    this.node.y += 30;
                }
                this.selected = true;
                window.selectedOwnCard = this.node;
                this.node.dispatchEvent( new cc.Event.EventCustom('select-card', true) );
            }
        }
    },

    unselectCard() {
        if(this.node.parent.name === 'my cards') {
            this.node.y -= 30;
            this.isOnHover = false;
            this.selected = false;
            this.node.dispatchEvent( new cc.Event.EventCustom('unselect-card', true) );
        }
    },

    onTouchStart: function(event) {
        if(!this.selected) {
            this.selectCard();
        } else {
            this.unselectCard();
        }
        event.stopPropagation()
    },

    onMouseEnter: function() {
        if(this.isSelectable && !this.selected && !this.isOnHover) {
            this.node.y += 20;
            this.isOnHover = true;
        }
    },

    onMouseLeave: function() {
        if(this.isSelectable && !this.selected && this.isOnHover) {
            this.node.y -= 20;
            this.isOnHover = false;
        }
    },

    onLoad: function() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);
    },

    start () {

    },

    // update (dt) {},
    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
        this.node.off(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);
    }
});
