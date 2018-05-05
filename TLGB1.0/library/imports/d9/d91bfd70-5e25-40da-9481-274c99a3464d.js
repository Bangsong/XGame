"use strict";
cc._RF.push(module, 'd91bf1wXiVA2pSBJ0yZo0ZN', 'GameMainControll');
// Scripts/GameMainControll.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        bgAudio: {
            url: cc.AudioClip,
            default: null
        },
        playerPre: {
            type: cc.Prefab,
            default: null
        },
        npcPre: {
            type: cc.Prefab,
            default: null
        },
        npcNewTime: {
            type: cc.Float,
            default: 0.9
        },
        playerY: {
            type: cc.Integer,
            default: -240
        },
        _gameHeight: 345,
        boomAudio: {
            url: cc.AudioClip,
            default: null
        },
        heartPre: {
            type: cc.Prefab,
            default: null
        },
        heartX: { type: cc.Integer, default: -453 },
        heartY: { type: cc.Integer, default: -285 },
        heartBronkenPre: {
            type: cc.Prefab,
            default: null
        },
        heartCount: {
            type: cc.Integer,
            default: 3
        },
        scoreNodeGroupPre: {
            type: cc.Prefab,
            default: null
        }
    },

    init: function init() {
        //初始化玩家
        this.player = cc.instantiate(this.playerPre);
        this.node.addChild(this.player);
        var GameWidth = this.node.width / 2 - 30;
        var playerX = cc.randomMinus1To1() * GameWidth;
        this.player.setPosition(cc.p(playerX, this.playerY));
        //初始化heart
        var scoreX = this.heartX + 60 * this.newHeart();
        //初始化分数
        this.scoreGroup = cc.instantiate(this.scoreNodeGroupPre);
        this.node.addChild(this.scoreGroup);
        this.scoreGroup.setPosition(cc.p(scoreX, this.heartY));
        this.scoreGroup.children[1].string = 0;
    },
    newNpc: function newNpc() {
        this.npc = cc.instantiate(this.npcPre);
        this.node.addChild(this.npc);
        var GameWidth = this.node.width / 2 - 40;
        var npcX = cc.randomMinus1To1() * GameWidth;
        this.npc.setPosition(cc.p(npcX, this._gameHeight));
    },
    newHeart: function newHeart() {
        var index = 0;
        while (index < this.heartCount) {
            this.heart = cc.instantiate(this.heartPre);
            this.node.addChild(this.heart);
            this.heart.setPosition(cc.p(this.heartX + 47 * index++, this.heartY));
        }
        return index;
    },
    onLoad: function onLoad() {
        //开启碰撞检测
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.enabledDrawBoundingBox = true;
        cc.director.preloadScene("GameOver");
        cc.audioEngine.play(this.bgAudio, true, 0.5);
        this.init();
        var scheduler = cc.director.getScheduler();
        scheduler.schedule(function () {
            this.newNpc();
        }, this, this.npcNewTime);
    },
    update: function update(dt) {
        var heartNode = cc.find("Canvas/heart");
        if (!heartNode || this.player.y > this.node.height / 2) {
            cc.sys.localStorage.setItem("score", cc.find("Canvas/scoreNode/score").getComponent(cc.Label).string);
            // console.log(cc.sys.localStorage.getItem("score"));
            cc.director.loadScene("GameOver");
        }
    }
});

cc._RF.pop();