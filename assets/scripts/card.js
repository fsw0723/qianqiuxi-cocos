cc.Class({
    extends: cc.Component,

    properties: {
    	image: {
    		default: null,
    		type: cc.Sprite
    	},
    	x: {
    		default:0,
    		type:cc.Float
    	}
    },

    loadCard: function(cardName) {
        let image = this.image;

        cc.loader.load({url: `https://qian-qiu-xi.herokuapp.com/images/${cardName}.jpg`, type: "jpeg"}, (err, tex)=>{
            if(err){
                cc.error(err);
            } else{
                let spf = new cc.SpriteFrame(tex);
                image.spriteFrame = spf;
            }
        });

    },

    onLoad: function() {
    },

    start () {

    },

    // update (dt) {},
});
