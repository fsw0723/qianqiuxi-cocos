const ws = require('./utils/webSocket');

cc.Class({
    extends: cc.Component,

    properties: {
        nextScene: cc.SceneAsset
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let context = this;
        ws.onopen = function (event) {
            console.log("Send Text WS was opened.");
            cc.director.loadScene(context.nextScene.name);
        };
    },

    start () {

    },

    // update (dt) {},
});
