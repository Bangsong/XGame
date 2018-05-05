"use strict";
cc._RF.push(module, '1d5e1RE+SxKKolQ5/Whcq3O', 'StartGame');
// Scripts/StartGame.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
cc.Class({
    extends: cc.Component,

    properties: {},

    startControll: function startControll() {
        //触摸事件
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            cc.director.loadScene("GameMain");
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