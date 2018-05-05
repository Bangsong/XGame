"use strict";
cc._RF.push(module, '41a1fVT/OBNP46k+Q9lLfmy', 'StartBtnControll');
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