cc.Class({
    extends: cc.Component,

    properties: {
        bgAudio:{
            url:cc.AudioClip,
            default:null
        },
        playerPre:{
            type:cc.Prefab,
            default:null
        },
        npcPre:{
            type:cc.Prefab,
            default:null
        },
        playerY:{
            type:Number,
            default:-240
        },
        _gameHeight:345,
        boomAudio:{
            url:cc.AudioClip,
            default:null
        },
    },

    init () {
        var self = this;
        //初始化玩家
        this.player = cc.instantiate(this.playerPre);
        this.node.addChild(this.player);
        var GameWidth = this.node.width/2 - 30;
        var playerX = cc.randomMinus1To1() * GameWidth;
        this.player.setPosition(cc.p(playerX,this.playerY));

    },
    newNpc () {
        this.npc = cc.instantiate(this.npcPre);
        this.node.addChild(this.npc);
        var GameWidth = this.node.width/2 - 40;
        var npcX = cc.randomMinus1To1() * GameWidth;
        this.npc.setPosition(cc.p(npcX,this._gameHeight));
    },
    onLoad () {


        cc.director.preloadScene("GameOver");
        cc.audioEngine.play(this.bgAudio,true,0.5);
        this.init();
        var scheduler = cc.director.getScheduler();
        scheduler.schedule(function(){
            this.newNpc();
        },this,0.8);
    },
    onCollisionEnter:function(other){

    },
    //碰撞检测
    collisionTest () {
        
        // if(cc.rectIntersectsRect(this.player.getBoundingBoxToWorld(),this.npc.getBoundingBoxToWorld())){
        //     if(this.player.y >= this.playerY+20){
        //         cc.audioEngine.play(this.boomAudio,false,0.5);
        //         this.npc.destroy();
        //         // score.string = parseInt(score.string) + 1;
        //         //此代码可以使player不穿过ghost
        //         // player.node.stopAllActions();
        //         // var moveTo = cc.moveTo(0.3,cc.p(player.node.x,canvas.playerDefaultY)); 
        //         // player.node.runAction(moveTo);
        //     }
        //     else{
        //         // cc.sys.localStorage.setItem("score",score.string);
        //         cc.director.loadScene("GameOver");
        //     }
        // }
    },
    update (dt) {
        if(this.player.y > this.node.height/2){
            cc.director.loadScene("GameOver");
        }
        this.collisionTest();
    },
});
