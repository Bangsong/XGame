cc.Class({
    extends: cc.Component,

    properties: {
        gameOverAudio:{
            url:cc.AudioClip,
            default:null
        },
        agaginBtn:{
            type:cc.Node,
            default:null
        },
        scroGroup:{
            type:cc.Node,
            default:null
        },
    },
    actionAll () {
        //agaginBtn动画
        var agaginBtnScaleSmall = cc.scaleTo(1,0.7,0.7);
        var agaginBtnScaleBig = cc.scaleTo(1,1,1);
        var agaginBtnSeq = cc.sequence(agaginBtnScaleSmall,agaginBtnScaleBig);
        var agaginBtnRepeat = cc.repeatForever(agaginBtnSeq);
        this.agaginBtn.runAction(agaginBtnRepeat);
        var agaginBtnRoate = cc.rotateBy(3,360);
        var agaginBtnRepeat = cc.repeatForever(agaginBtnRoate);
        this.agaginBtn.runAction(agaginBtnRepeat);
        //scroGroup动画
        var scroGroupRoate = cc.rotateBy(1,13);
        var scroGroupRoateBack = cc.rotateTo(1,13);
        var scroGroupSeq = cc.sequence(scroGroupRoate,scroGroupRoateBack);
        var scroGroupRepeat = cc.repeatForever(scroGroupSeq);
        this.scroGroup.runAction(scroGroupRepeat);
    },
    againControll () {
        this.agaginBtn.on("touchstart",function(){
            cc.audioEngine.stopAll();
            cc.director.loadScene("GameMain");
        });
    },
    onLoad () {
        cc.director.preloadScene("GameMain");
        cc.audioEngine.stopAll();
        cc.audioEngine.play(this.gameOverAudio,false,0.5);
        this.actionAll();
        this.againControll();
    },
});
