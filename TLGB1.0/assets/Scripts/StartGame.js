// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    startControll () {
        //触摸事件
        this.node.on(cc.Node.EventType.TOUCH_START,function(){
            cc.director.loadScene("GameMain");
        });
    },
    onLoad () {
        cc.director.preloadScene("GameMain");
        this.startControll();
    },


    // update (dt) {},
});
