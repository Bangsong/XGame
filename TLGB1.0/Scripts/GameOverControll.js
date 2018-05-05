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
        scorGroup:{
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
        var scorGroupRoate = cc.rotateBy(1,13);
        var scorGroupRoateBack = cc.rotateTo(1,13);
        var scorGrouppSeq = cc.sequence(scorGroupRoate,scorGroupRoateBack);
        var scorGroupRepeat = cc.repeatForever(scorGrouppSeq);
        this.scorGroup.runAction(scorGroupRepeat);
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
        var score = cc.find("Canvas/score_Group/score").getComponent(cc.Label);
        score.string = "最终得分：" + cc.sys.localStorage.getItem("score");
        this.actionAll();
        this.againControll();
    },
});
