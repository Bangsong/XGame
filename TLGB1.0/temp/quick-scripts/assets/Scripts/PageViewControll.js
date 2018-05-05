(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/PageViewControll.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a9beb/cxE9F6IU5sR+bysCn', 'PageViewControll', __filename);
// Scripts/PageViewControll.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        pageView: {
            type: cc.Node,
            default: null
        },
        startBtn: {
            type: cc.Node,
            default: null
        },
        progressBar: {
            type: cc.ProgressBar,
            default: null
        }
    },
    startBtnControll: function startBtnControll() {
        var self = this;
        //触摸事件
        this.startBtn.on(cc.Node.EventType.TOUCH_START, function () {
            var scaleToSmall = cc.scaleTo(1, 0.8, 0.9);
            var scaleToBig = cc.scaleTo(1, 1, 1);
            var seq = cc.sequence(scaleToSmall, scaleToBig);
            self.startBtn.runAction(seq);
            self.progressBar.node.runAction(cc.show());
            self.barFlag = true;
        });
    },
    updateBar: function updateBar(dt) {
        var progress = this.progressBar.progress;
        if (progress < 1.0) {
            progress += dt * 1;
        } else {
            cc.director.loadScene("GameMain");
        }
        this.progressBar.progress = progress;
    },
    onLoad: function onLoad() {
        cc.audioEngine.stopAll();
        cc.director.preloadScene("GameMain");
        this.barFlag = false;
        this.progressBar.node.runAction(cc.hide());
        this.startBtnControll();
    },
    update: function update(dt) {
        if (this.barFlag) this.updateBar(dt);
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
        //# sourceMappingURL=PageViewControll.js.map
        