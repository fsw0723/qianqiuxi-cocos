const {initializeWs} = require('../utils/websocket');
const constants = require('../Constants');

cc.Class({
    extends: cc.Component,

    properties: {
        nextScene: cc.SceneAsset
    },

    // LIFE-CYCLE CALLBACKS:

    prefetchImages(){
        let xhr = new XMLHttpRequest();

        for (let [cardName, value] of Object.entries(constants.cardNames)) {
            cc.loader.load({url: `http://www.fun-world.xyz:3000/images/${cardName}`, type: "jpeg"})
        }
    },

    onLoad () {
        this.prefetchImages();
        let context = this;
        let ws = initializeWs();

        window.ws = ws;
        ws.onopen = function (event) {
            console.log("Send Text WS was opened.");
        };

        ws.onmessage = function (event) {
            console.log("response text msg: " + event.data);
            let data = JSON.parse(event.data);
            if(data.type === constants.events.CREATE_PLAYER_ID) {
                window.playerId = data.id;
                cc.director.loadScene(context.nextScene.name);
            }
        };
    },

    start () {

    },

    // update (dt) {},
});
