const ws = require('./utils/webSocket');

cc.Class({
    extends: cc.Component,

    properties: {
       cardPrefab:{
            default: null,
            type: cc.Prefab
       }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
      
    initCards: function(cards) {
        for(let i = 0; i <= cards.length; i++) {
            let card = cc.instantiate(this.cardPrefab);
            card.x = -300+70*i;
            card.getComponent('card').loadCard(cards[i]);
            card.parent = this.node;
        }
    },

    start: function() {
        let context = this;
        ws.onmessage = function (event) {
            console.log('---on message', event.data)
            if(event.data.startsWith('InitCards')) {
                console.log('---init---');
                context.initCards(event.data.split(':')[1].trim().split(','));
                
            }
        };
       
        
    },

    // update (dt) {},
});
