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
        pairs: {
            default: null,
            type: cc.Node
        },
        menuIndex: 1,
        mode: ''
    },

    onClickBack() {
        this.node.parent.getChildByName('game').active = true;
        this.node.active = false;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let pairs = [
            {
                cards: ['qy', 'cs'],
                name: '空徊',
                points: 4
            }
        ];
        this.pairs.getComponent('Pairs').initPairs(pairs);
    },

    start () {
    },

    onEnable() {
//        if(this.mode === 'OWN') {
//            this.node.getChildByName('header').getChildByName('title').getComponent(cc.Label).string = '我方卡牌';
////            this.cards.getComponent('Cards').initCards(window.mySelectedCards);
//            this.pairs.getComponent('Pairs').initPairs();
//        } else if (this.mode === 'OPPONENT') {
//            this.node.getChildByName('header').getChildByName('title').getComponent(cc.Label).string = '对方卡牌';
//            let pairs = [
//                {
//                    cards: ['qy', 'cs'],
//                    name: '空徊',
//                    points: 4
//                }
//            ];
//            this.pairs.getComponent('Pairs').initPairs(pairs);
//
////            this.cards.getComponent('Cards').initCards(window.opponentSelectedCards);
//        }
    }

    // update (dt) {},
});
