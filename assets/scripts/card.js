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

    handleMoveCard() {
        let selectedDeck= this.node.parent.parent.getChildByName('selected deck');
        let worldPosition = this.node.convertToWorldSpaceAR(selectedDeck.getPosition());
        // 执行动作
        var finished1 = cc.callFunc(function(target) {
            this.node.removeFromParent();
            this.node.x = 0;
            this.node.y = 0;
            this.node.parent = selectedDeck;
        }, this);

        var finished2 = cc.callFunc(function(target) {
            window.selectedOwnCard.removeFromParent();
            window.selectedOwnCard.x = 0;
            window.selectedOwnCard.y = 0;
            window.selectedOwnCard.parent = selectedDeck;
        }, this);

        const action1 = cc.sequence(cc.moveTo(0.5, this.node.convertToNodeSpaceAR(worldPosition)), finished1);
        this.node.runAction(action1);
        const action2 = cc.sequence(cc.moveTo(0.5, cc.v2(-400, 0)), finished2);
        window.selectedOwnCard.runAction(action2);
    },

    handleCardSelected() {
    //                ws.send(JSON.stringify({
    //                    type: Constants.events.SELECT_CARD,
    //                    playerId: window.id,
    //                    selectedCardFromDeck: this.cardName,
    //                    selectedOwnCard: window.selectedOwnCard.cardName
    //                }));
//        this.handleMoveCard();
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
