cc.Class({
    extends: cc.Component,

    properties: {
    },
    startBtnControll () {
        var self = this;
        //触摸事件
        this.node.on(cc.Node.EventType.TOUCH_START,function(){
            cc.audioEngine.stopAll();
            cc.director.loadScene("GameExplain");
        });
    },
    onLoad () {
        cc.director.preloadScene("GameExplain");
        this.startBtnControll();
    },
});
