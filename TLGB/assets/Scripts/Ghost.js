var tmpPlayer = require("Player");
var tmpBlink = require("Blink");
var tmpGameMain = require("GameMain");
cc.Class({
    extends: cc.Component,

    properties: {
        
    },
    noteBox(){
        return this.node.getBoundingBoxToWorld();
    },
    onLoad () {
    },
    update (dt) {
        var player = cc.find("Canvas/player").getComponent(tmpPlayer);
        var blink = cc.find("Canvas/blink").getComponent(tmpBlink);
        var canvas = cc.find("Canvas").getComponent(tmpGameMain);
        var score = cc.find("Canvas/score").getComponent(cc.Label);
        //到达星星位置，则消除一个星星
        if(this.node.y < -305){
            cc.audioEngine.play(canvas.blinkAduio,false,0.5);
            blink.node.destroy();
            canvas.blinkCount--;
            this.node.destroy();
            if(canvas.blinkCount == 0){
                cc.director.loadScene("GameOver");
            }
        }
        
        console.log(parseInt(score.string) + 1);
        if(cc.rectIntersectsRect(player.node.getBoundingBoxToWorld(),this.noteBox())){
            if(player.node.y >= canvas.playerDefaultY+20){
                cc.audioEngine.play(canvas.boomAudio,false,0.5);
                this.node.destroy();
                score.string = parseInt(score.string) + 1;
                ////此代码可以使player不穿过ghost
                // player.node.stopAllActions();
                // var moveTo = cc.moveTo(0.3,cc.p(player.node.x,this.playerDefaultY)); 
                // player.node.runAction(moveTo);
            }
            else{
                cc.director.loadScene("GameOver");
            }
        }
    },
});
