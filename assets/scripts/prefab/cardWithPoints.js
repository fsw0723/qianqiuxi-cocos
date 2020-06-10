const Constants = require('../Constants');

cc.Class({
    extends: cc.Component,

    properties: {
    },

    loadCard: function(cardName) {
        let context = this;
        cc.loader.load({url: `${Constants.imagesUrl}/${cardName}.jpg`, type: "jpeg"}, (err, tex)=>{
            if(err){
                cc.error(err);
            } else{
                let spf = new cc.SpriteFrame(tex);
                let sp = context.node.getChildByName('card image').getComponent(cc.Sprite);
                sp.spriteFrame = spf;
                this.cardName = cardName;
            }
        });
    },

    onLoad: function() {
    },

    start () {

    },

    // update (dt) {},
});
