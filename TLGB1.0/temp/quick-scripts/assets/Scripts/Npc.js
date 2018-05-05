(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Npc.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '296e0ykWC5N0oc4R1bthx4J', 'Npc', __filename);
// Scripts/Npc.js

"use strict";

var heartTmp = require("Heart");
cc.Class({
    extends: cc.Component,
    properties: {
        boomAudio: {
            url: cc.AudioClip,
            default: null
        },
        heartDestroyAudio: {
            url: cc.AudioClip,
            default: null
        },
        floorY: {
            type: cc.Integer,
            default: -238
        }
    },
    npcAction: function npcAction() {
        var scaleSmall = cc.scaleTo(0.1, 0.8, 0.9);
        var scaleBig = cc.scaleTo(0.1, 1, 1);
        var seq = cc.sequence(scaleSmall, scaleBig);
        this.node.runAction(cc.repeatForever(seq));
    },
    onLoad: function onLoad() {
        this.npcAction();
    },

    onCollisionEnter: function onCollisionEnter(other) {
        // console.log("发生碰撞");
        cc.audioEngine.play(this.boomAudio, false, 0.5);
        this.node.destroy();
        var score = cc.find("Canvas/scoreNode/score").getComponent(cc.Label);
        score.string = parseInt(score.string) + 1;
    },
    update: function update(dt) {
        var downSpeed = cc.random0To1() * 200 + 1;
        this.node.y--;
        if (this.node.y <= this.floorY) {
            this.node.destroy();
            cc.audioEngine.play(this.heartDestroyAudio, false, 0.5);
            var heartNode = cc.find("Canvas/heart");
            if (heartNode) {
                var heart = heartNode.getComponent(heartTmp);
                heart.node.destroy();
            }
        }
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Npc.js.map
        