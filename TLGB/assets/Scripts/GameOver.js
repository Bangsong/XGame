cc.Class({
    extends: cc.Component,

    properties: {
        gameOverAudio:{
            url:cc.AudioClip,
            default:null
        },
        againBtn:{
            type:cc.Node,
            default:null
        },
        score:{
            type:cc.Label,
            default:null
        }
    },

    // LIFE-CYCLE CALLBACKS:
    againBtnControll(){
        var StartBtnScaleTo1 = cc.scaleTo(1,0.7,0.9);
        var StartBtnScaleTo2 = cc.scaleTo(1,0.8,1);
        var StartBtnSeq = cc.sequence(StartBtnScaleTo1,StartBtnScaleTo2);
        var StartBtnRepeate = cc.repeatForever(StartBtnSeq);
        this.againBtn.runAction(StartBtnRepeate);
        this.againBtn.on("touchstart",function(){
            cc.audioEngine.stopAll();
            cc.director.loadScene("GameMain");
        });
    },
    onLoad () {
        cc.audioEngine.stopAll();
        cc.audioEngine.play(this.gameOverAudio,false,0.5);
        this.score.string = "最终得分：" + cc.sys.localStorage.getItem("score");
        cc.director.preloadScene("GameMain");
        this.againBtnControll();
    },

    // update (dt) {},
});
