cc.Class({
    extends: cc.Component,

    properties: {
        cardWithPointsPrefab:{
            default: null,
            type: cc.Prefab
        },
        cards: {
            default: null,
            type: cc.Node
        },
        mode: ''
    },

    onClickBack() {
        this.node.parent.getChildByName('game').active = true;
        this.node.active = false;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {
    },

    onEnable() {
        if(this.mode === 'OWN') {
            this.node.getChildByName('header').getChildByName('title').getComponent(cc.Label).string = '我方卡牌';
            this.cards.getComponent('Cards').initCards(window.mySelectedCards);
        } else if (this.mode === 'OPPONENT') {
            this.node.getChildByName('header').getChildByName('title').getComponent(cc.Label).string = '对方卡牌';
            this.cards.getComponent('Cards').initCards(window.opponentSelectedCards);
        }
    }

    // update (dt) {},
});
