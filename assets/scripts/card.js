cc.Class({
    extends: cc.Component,

    properties: {
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

    onTouchStart: function() {
        this.node.y += 30;
    },

    onLoad: function() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onTouchStart, this);
    },

    start () {

    },

    // update (dt) {},
});
