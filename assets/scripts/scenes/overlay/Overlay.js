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

    onClickMenu1() {
        this.node.getChildByName('cards').active = true;
        this.node.getChildByName('pairs').active = false;
        if(this.mode === 'OWN') {
            this.cards.getComponent('Cards').initCards(window.mySelectedCards);
        } else if (this.mode === 'OPPONENT') {
            this.cards.getComponent('Cards').initCards(window.opponentSelectedCards);
        }

    },

    onClickMenu2() {
        this.node.getChildByName('cards').active = false;
        this.node.getChildByName('pairs').active = true;
        if(this.mode === 'OWN') {
            this.pairs.getComponent('Pairs').initPairs(window.myPairs);
        } else if (this.mode === 'OPPONENT') {
            this.pairs.getComponent('Pairs').initPairs(window.opponentPairs);
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
//        let pairs = [
//            {
//                cards: ['qy', 'blts'],
//                name: '空徊',
//                points: 4
//            },
//            {
//                cards: ['hllp', 'blts'],
//                name: '故友赠礼',
//                points: 3
//            }
//        ];
//        this.pairs.getComponent('Pairs').initPairs(pairs);

        this.node.getChildByName('menu1').on(cc.Node.EventType.TOUCH_START, this.onClickMenu1, this);
        this.node.getChildByName('menu2').on(cc.Node.EventType.TOUCH_START, this.onClickMenu2, this);

    },

    start () {
    },

    onEnable() {
        this.node.getChildByName('cards').active = true;
        this.node.getChildByName('pairs').active = false;
        if(this.mode === 'OWN') {
            this.node.getChildByName('header').getChildByName('title').getComponent(cc.Label).string = '我方卡牌';
            this.cards.getComponent('Cards').initCards(window.mySelectedCards);
//            this.pairs.getComponent('Pairs').initPairs();
        } else if (this.mode === 'OPPONENT') {
            this.node.getChildByName('header').getChildByName('title').getComponent(cc.Label).string = '对方卡牌';
            let pairs = [
                {
                    cards: ['qy', 'cs'],
                    name: '空徊',
                    points: 4
                }
            ];
//            this.pairs.getComponent('Pairs').initPairs(pairs);

            this.cards.getComponent('Cards').initCards(window.opponentSelectedCards);
        }
    }

    // update (dt) {},
});
