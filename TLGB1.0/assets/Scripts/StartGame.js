// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    startControll () {
        var self = this;
        //触摸事件
        this.node.on(cc.Node.EventType.TOUCH_START,function(){
            var scaleToSmall = cc.scaleTo(1,0.8,0.9);
            var scaleToBig = cc.scaleTo(1,1,1);
            var fadeOut = cc.fadeOut(2);
            var seq = cc.sequence(scaleToSmall,scaleToBig,fadeOut);
            self.node.runAction(seq);
            // cc.director.loadScene("GameMain");
        });
    },
    onLoad () {
        cc.director.preloadScene("GameMain");
        this.startControll();
    },


    // update (dt) {},
});
