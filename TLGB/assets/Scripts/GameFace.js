cc.Class({
    extends: cc.Component,

    properties: {
        bgAudio:{
            url:cc.AudioClip,
            default:null
        },
        startBtn:{
            type:cc.Node,
            default:null
        },
        title1:{
            type:cc.Node,
            default:null
        },
        title3:{
            type:cc.Node,
            default:null
        },
    },
    //元素动画
    elemAction(){
        //title1
        var T1Rotate1 = cc.rotateBy(5,360);
        var T1Rotate2 = cc.scaleTo(1,1.5,1.2);
        var T1ScaleTo = cc.scaleTo(1,1,1);
        var T1Seq = cc.sequence(T1Rotate1,T1Rotate2,T1ScaleTo);
        var T1Repeate = cc.repeatForever(T1Seq);
        this.title1.runAction(T1Repeate);
        //title3
        var T3fadeOut = cc.fadeOut(1.0);
        var T3fadeIn = cc.fadeIn(3,1.0);
        var T3seq  = cc.sequence(T3fadeOut,T3fadeIn);
        var T3Repeate = cc.repeatForever(T3seq);
        this.title3.runAction(T3Repeate);
        //start
        var StartBtnScaleTo1 = cc.scaleTo(1,0.7,0.9);
        var StartBtnScaleTo2 = cc.scaleTo(1,0.8,1);
        var StartBtnSeq = cc.sequence(StartBtnScaleTo1,StartBtnScaleTo2);
        var StartBtnRepeate = cc.repeatForever(StartBtnSeq);
        this.startBtn.runAction(StartBtnRepeate);
    },
    //开始按钮
    startBtnControll(){
        var self = this;
        self.startBtn.on("touchstart",function(){
            cc.audioEngine.stopAll();
            cc.director.loadScene("GameMain");
        });
    },
    onLoad () {
        cc.director.preloadScene("GameMain");//预加载游戏界面
        cc.audioEngine.play(this.bgAudio,true,0.5);//添加背景音乐
        this.elemAction();
        this.startBtnControll();
    },
});
