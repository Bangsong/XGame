(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/StartGame.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1d5e1RE+SxKKolQ5/Whcq3O', 'StartGame', __filename);
// Scripts/StartGame.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
cc.Class({
    extends: cc.Component,

    properties: {},

    startControll: function startControll() {
        var self = this;
        //触摸事件
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            var scaleToSmall = cc.scaleTo(1, 0.8, 0.9);
            var scaleToBig = cc.scaleTo(1, 1, 1);
            var fadeOut = cc.fadeOut(2);
            var seq = cc.sequence(scaleToSmall, scaleToBig, fadeOut);
            self.node.runAction(seq);
            // cc.director.loadScene("GameMain");
        });
    },
    onLoad: function onLoad() {
        cc.director.preloadScene("GameMain");
        this.startControll();
    }
}

// update (dt) {},
);

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
        //# sourceMappingURL=StartGame.js.map
        