var heartTmp = require("Heart");
cc.Class({
    extends: cc.Component,
    properties: {
        boomAudio:{
            url:cc.AudioClip,
            default:null
        },
        heartDestroyAudio:{
            url:cc.AudioClip,
            default:null
        },
        floorY:{
            type:cc.Integer,
            default:-233
        },
        downSpeed:{
            type:cc.Float,
            default:0
        },
    },
    npcAction () {
        var scaleSmall = cc.scaleTo(0.1,0.8,0.9);
        var scaleBig = cc.scaleTo(0.1,1,1);
        var seq = cc.sequence(scaleSmall,scaleBig); 
        this.node.runAction(cc.repeatForever(seq));
    },
    onLoad () {
        this.npcAction();
    },
    onCollisionEnter: function (other) {
        // console.log("发生碰撞");
        if(other.node.name != "npc"){
            cc.audioEngine.play(this.boomAudio,false,0.5);
            this.node.destroy();
            var score = cc.find("Canvas/scoreNode/score").getComponent(cc.Label);
            score.string = parseInt(score.string) + 1;
        }
    },
    update (dt) {
        var down = cc.random0To1() * this.downSpeed + 0.1;
        this.node.y-=down;
        if(this.node.y <= this.floorY){
            this.node.destroy();
            cc.audioEngine.play(this.heartDestroyAudio,false,0.5);
            var heartNode = cc.find("Canvas/heart");
            if(heartNode){
                var heart = heartNode.getComponent(heartTmp);
                heart.node.destroy();
            }
        }
    },
});
