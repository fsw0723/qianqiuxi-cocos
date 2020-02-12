const CardModel = require('CardModel');
const ws = require('./utils/webSocket');

cc.Class({
    extends: cc.Component,

    properties: {
        cardsLeft: [],
        playerA: {
            default: null,
            type: cc.Node
        }
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    onClickButton() {
        console.log('click button');

        

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.cardsLeft.push(new CardModel('ar2'));

        setTimeout(function () {
            console.log('Timeout')
            if (ws.readyState === WebSocket.OPEN) {
                ws.send("InitCards");
            }
            else {
                console.log("WebSocket instance wasn't ready...");
            }
         }, 3000);
    },

    start () {

    },

    // update (dt) {},
});
