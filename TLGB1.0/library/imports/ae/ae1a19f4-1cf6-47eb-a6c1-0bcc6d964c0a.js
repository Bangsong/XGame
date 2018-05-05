"use strict";
cc._RF.push(module, 'ae1a1n0HPZH66bBC8xtlkwK', 'GameStartControll');
// Scripts/GameStartControll.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        bgAduio: {
            url: cc.AudioClip,
            default: null
        },
        title_endlish: {
            type: cc.Node,
            default: null
        },
        TLGB: {
            type: cc.Node,
            default: null
        },
        skeleton: {
            type: cc.Node,
            default: null
        },
        startBtn: {
            type: cc.Node,
            default: null
        }
        // pendant:{
        //     type:cc.Node,
        //     default:null
        // },
    },

    action: function action() {
        //title_endlish动画
        var titleFadeOut = cc.fadeOut(1);
        var titleFadeIn = cc.fadeIn(1);
        var titleScaleToOut = cc.scaleTo(1, 0.7, 0.8);
        var titleScaleToIn = cc.scaleTo(1, 0.8, 0.9);
        var titleSeq = cc.sequence(titleScaleToOut, titleFadeOut, titleFadeIn, titleScaleToIn);
        var titleRepeat = cc.repeatForever(titleSeq);
        this.title_endlish.runAction(titleRepeat);
        //TLGB动画
        var TLGBRoateBy360 = cc.rotateBy(4, 360);
        var TLGBRoateBy0 = cc.rotateBy(1, 0);
        var TLGBRepeate = cc.repeatForever(TLGBRoateBy360);
        this.TLGB.runAction(TLGBRepeate);
        //skeleton动画
        var skeletonRoate15 = cc.rotateTo(0.5, 15);
        var skeletonRoate_15 = cc.rotateTo(0.5, -15);
        var skeletonSeq = cc.sequence(skeletonRoate15, skeletonRoate_15);
        var skeletonRepeat = cc.repeatForever(skeletonSeq);
        this.skeleton.runAction(skeletonRepeat);
        //startBtn动画
        var startroateBy20 = cc.rotateTo(1, 20);
        var startroateBy_20 = cc.rotateTo(1, -20);
        var startBtnSeq = cc.sequence(startroateBy20, startroateBy_20);
        var startRepeat = cc.repeatForever(startBtnSeq);
        this.startBtn.runAction(startRepeat);
        //pendant动画
        // var pendantRoate20 = cc.rotateTo(1,20);
        // var pendantRoate_20 = cc.rotateTo(1,-20);
        // var pendantSeq = cc.sequence(pendantRoate20,pendantRoate_20);
        // var pendantRepeat = cc.repeatForever(pendantSeq);
        // this.pendant.runAction(pendantRepeat);
    },
    onLoad: function onLoad() {
        cc.audioEngine.play(this.bgAduio, true, 0.5);
        this.action();
    }
});

cc._RF.pop();