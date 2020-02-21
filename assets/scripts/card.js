cc.Class({
    extends: cc.Component,

    properties: {
        selected: false
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
            }
        });
    },

    selectCard() {
        this.node.y += 30;
        this.selected = true;
        this.node.dispatchEvent( new cc.Event.EventCustom('select-card', true) );
    },

    unselectCard() {
        this.node.y -= 30;
        this.selected = false;
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
