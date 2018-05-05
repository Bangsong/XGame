(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/StartBtnControll.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '41a1fVT/OBNP46k+Q9lLfmy', 'StartBtnControll', __filename);
// Scripts/StartBtnControll.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},
    startBtnControll: function startBtnControll() {
        var self = this;
        //触摸事件
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            cc.audioEngine.stopAll();
            cc.director.loadScene("GameExplain");
        });
    },
    onLoad: function onLoad() {
        cc.director.preloadScene("GameExplain");
        this.startBtnControll();
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
        //# sourceMappingURL=StartBtnControll.js.map
        