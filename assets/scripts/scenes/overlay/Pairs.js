cc.Class({
    extends: cc.Component,

    properties: {
        pairPrefab:{
            default: null,
            type: cc.Prefab
        }
    },

    initPairs: function(pairs) {
//        window.mySelectedCards = ['ar', 'blts', 'tyc', 'hyue', 'yd', 'fls', 'jt', 'lyc', 'xyz']
        this.node.removeAllChildren();
        for(let i = 0; i < pairs.length; i++) {
            let pairPrefab = cc.instantiate(this.pairPrefab);
            pairPrefab.getComponent('matchingPair').load(pairs[i]);
            pairPrefab.y = -140*i;
            pairPrefab.parent = this.node;
        }
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {

    },

    // update (dt) {},
});
