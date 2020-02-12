cc.Class({
    extends: cc.Component,

    properties: {
       nextScene: cc.SceneAsset
    },

    onClickButton() {
        console.log('click button');
        cc.director.loadScene(this.nextScene.name);
    },
    // LIFE-CYCLE CALLBACKS:

    start () {

    },

    // update (dt) {},
});
