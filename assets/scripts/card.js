const ws = require('./utils/websocket');
const Constants = require('./Constants');

cc.Class({
    extends: cc.Component,

    properties: {
        selected: false,
        isSelectable: false,
        cardName: ''
    },

    loadCard: function(cardName) {
        let context = this;
        cc.loader.load({url: `https://qian-qiu-xi.herokuapp.com/images/${cardName}.jpg`, type: "jpeg"}, (err, tex)=>{
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
        ws.send(JSON.stringify({
            type: Constants.events.SELECT_CARD,
            playerId: window.id,
            selectedCardFromDeck: this.cardName,
            selectedOwnCard: window.selectedOwnCard.getComponent('card').cardName
        }));
        this.node.dispatchEvent( new cc.Event.EventCustom('card-selected', true) );
    },

    selectCard() {
        if(this.isSelectable) {
            if(this.node.parent.name === 'new cards') {
                window.selectedDeckCard = this.node;
                this.handleCardSelected();
            } else {
                this.node.y += 30;
                this.selected = true;
                window.selectedOwnCard = this.node;
                this.node.dispatchEvent( new cc.Event.EventCustom('select-card', true) );
            }
        }
    },

    unselectCard() {
        if(this.node.parent.name === 'my cards') {
            this.node.y -= 30;
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

    onLoad: function() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    },

    start () {

    },

    // update (dt) {},
    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    }
});
