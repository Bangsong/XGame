var tmpBlink = require("Blink");
// var tmpGhost = require("Ghost");
cc.Class({
    extends: cc.Component,

    properties: {
        //背景音乐
        bgAduio:{
            url:cc.AudioClip,
            default:null
        },
        //玩家预制
        playerPre:{
            type:cc.Prefab,
            default:null
        },
        //玩家默认位置
        playerDefaultX:{
            type:Number,
            default:-21
        },
        playerDefaultY:{
            type:Number,
            default:-245.5
        },
        //玩家撞击怪物声音
        boomAudio:{
            url:cc.AudioClip,
            default:null
        },
        //台阶预制
        Steps:{
            type:cc.Prefab,
            default:null
        },
        //触摸声音
        touchAudio:{
            url:cc.AudioClip,
            default:null
        },
        //跳跃声音
        jumpGoAduio:{
            url:cc.AudioClip,
            default:null
        },
        //跳跃高度
        jumpHeight:{
            type:Number,
            default:50
        },
        //左右移动长度
        moveLen:{
            type:Number,
            default:20
        },
        //移动跳跃高度
        jumpMoveHeight:{
            type:Number,
            default:8
        },
        //墙高度
        wallWidth:{
            type:Number,
            default:63
        },
        //星星预制
        blinks:{
            type:cc.Prefab,
            default:null
        },
        //星星销毁声音
        blinkAduio:{
            url:cc.AudioClip,
            default:null
        },
        //怪物预制
        ghosts:{
            type:cc.Prefab,
            default:null
        },
        //怪物一次生成个数
        ghostCount:{
            type:Number,
            default:4
        },
        //怪物生成间隔时间
        newGhostTimes:{
            type:Number,
            default:3
        },
        //怪物速度
        ghostSpeed:{
            type:Number,
            default:30
        },
        // Arrow:{
        //     type:cc.Prefab,
        //     default:null
        // },
        //怪物生成最小位置
        ghostMinX:{
            type:Number,
            default:-161
        },
        //怪物生成最大位置
        ghostMaxX:{
            type:Number,
            default:157
        },
        //分数预制
        zero:{
            type:cc.Prefab,
            default:null
        },
        one:{
            type:cc.Prefab,
            default:null
        },
        two:{
            type:cc.Prefab,
            default:null
        },
        three:{
            type:cc.Prefab,
            default:null
        },
        four:{
            type:cc.Prefab,
            default:null
        },
        five:{
            type:cc.Prefab,
            default:null
        },
        six:{
            type:cc.Prefab,
            default:null
        },
        seven:{
            type:cc.Prefab,
            default:null
        },
        eight:{
            type:cc.Prefab,
            default:null
        },
        nine:{
            type:cc.Prefab,
            default:null
        },

    },
    
    init(){
        //初始化台阶
        for(var i = 0;i<=8;i++){
            var Step = cc.instantiate(this.Steps);
            this.node.addChild(Step);
            Step.setPosition(cc.p(this.node.width/2-42 - 40*i,-273.5));
        };
        //初始化星星
        for(var i = 0;i<3;i++){
            var blink = cc.instantiate(this.blinks);
            this.node.addChild(blink);
            blink.setPosition(cc.p(-this.node.width/2+42 + 40*i,-304.5));
        }
        //初始化角色
        this.player = cc.instantiate(this.playerPre);
        this.node.addChild(this.player);
        this.player.setPosition(cc.p(this.playerDefaultX,this.playerDefaultY));
        //初始化NPC
        for(var i = 0;i<this.ghostCount;i++){
            this.newGhost();
        }
        //初始分数
        var scoreTitle = cc.find("Canvas/scoreTitle");
        var score = cc.find("Canvas/score");
        scoreTitle.setPosition(cc.p(this.node.width/2-120,-310));
        score.setPosition(cc.p(this.node.width/2-60,-310));
        // var zero = cc.instantiate(this.zero);
        // this.node.addChild(zero);
        // zero.setPosition(cc.p(this.node.width/2-42,-310));
    },
    newGhostTime(){
        var self = this;
        for(var i = 0;i<this.ghostCount;i++){
            var scheduler = cc.director.getScheduler();
            scheduler.schedule(function(){
                // console.log("生成ghost");
                self.newGhost();
            },this,self.newGhostTimes,true);
        }
    },
    newGhost(){
        var ghost = cc.instantiate(this.ghosts);
        var posY = 385 + cc.random0To1() * 100;
        var speed = cc.random0To1() * this.ghostSpeed;
        this.node.addChild(ghost);
        do{
            var posX = cc.randomMinus1To1() * this.ghostMaxX;
            // console.log(posX);
        }while(posX < this.ghostMinX || posX > this.ghostMaxX);
        // console.log(posX + "   "+ posY);
        
        ghost.setPosition(cc.p(posX,posY));
        var scaleTo1 = cc.scaleTo(0.1,0.8,0.9);
        var scaleTo2 = cc.scaleTo(0.1,1,1);
        var move = cc.moveBy(0.2,cc.p(0,-speed));
        var seq = cc.sequence(scaleTo1,scaleTo2,move); 
        ghost.runAction(cc.repeatForever(seq));
    },
    jumpControll(){
        var self = this;
        var scheduler = cc.director.getScheduler();
        scheduler.schedule(function(){
            self.toucheTime++;
        },self,0.2);
        var Id;
        var PlayerScaleTo1 = cc.scaleTo(0.5,0.7,0.8);
        var PlayerScaleTo2 = cc.scaleTo(0.3,0.8,0.9);
        var PlayerTouch = cc.repeatForever(cc.sequence(PlayerScaleTo1,PlayerScaleTo2));
        //触摸开始
        self.player.on(cc.Node.EventType.TOUCH_START,function(){
            // console.log("触摸");
            self.toucheTime = 1;
            scheduler.resumeTarget(self);
            self.player.runAction(PlayerTouch);
            Id = cc.audioEngine.play(self.touchAudio,true,0.5);
            scheduler.unscheduleUpdateForTarget(this);
        });
        // //触摸移动
        // this.player.on(cc.Node.EventType.TOUCH_MOVE,function(event){
        //     console.log("触摸移动");
        //     var startPos = cc.p(self.newNode.x,self.newNode.y);
        //     var delta = event.touch.getDelta();
        //     var endPos = cc.p(self.newNode.x + delta.x,self.newNode.y + delta.y);
        //     var posSub = endPos.sub(startPos);
        //     var anggle = cc.pToAngle(posSub)/Math.PI *180;
        //     console.log(delta.x+":"+delta.y);
        //     var ArrowRotate = cc.rotateBy(0,anggle);
        //     self.newNode.runAction(ArrowRotate);
        // });
        //触摸结束
        self.player.on(cc.Node.EventType.TOUCH_END,function(){
            // console.log("触摸结束");
            var jumpHeight = self.jumpHeight * self.toucheTime;
            // console.log(self.toucheTime + "    "+jumpHeight);
            scheduler.pauseTarget(self);
            cc.audioEngine.stop(Id);
            self.player.stopAction(PlayerTouch);
            var PlayerReverse = cc.scaleTo(0.2,1,1);
            self.player.runAction(PlayerReverse);
            cc.audioEngine.play(self.jumpGoAduio,false,0.5);
            var PlayerMoveBy1 = cc.moveBy(0.5,0,jumpHeight);
            var PlayerMoveBy2 = cc.moveBy(0.45,0,-jumpHeight);
            self.player.runAction(cc.sequence(PlayerMoveBy1,PlayerMoveBy2));
        });
        self.player.on(cc.Node.EventType.TOUCH_CANCEL,function(){
            // console.log("触摸移动结束");
            cc.audioEngine.stop(Id);
            self.player.stopAction(PlayerTouch);
            var PlayerReverse = cc.scaleTo(0.2,1,1);
            self.player.runAction(PlayerReverse);
            // cc.audioEngine.play(self.jumpGoAduio,false,0.5);
            // var PlayerMoveBy1 = cc.moveBy(0.5,0,100);
            // var PlayerMoveBy2 = cc.moveBy(0.5,0,-100);
            // self.player.runAction(cc.sequence(PlayerMoveBy1,PlayerMoveBy2));
        });
    },
    moveControll(){
        var self = this;
        var listener = {
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan:function(touches,event){
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touches.getLocation());
                // console.log(self.player.x + "    "+ (-self.node.width/2+self.wallWidth) + "    "+self.wallWidth );
                //向右移动
                if(locationInNode.x > 40 && self.player.x < self.node.width/2-self.wallWidth){
                    cc.audioEngine.play(self.jumpGoAduio,false,0.5);
                    var jump1 = cc.moveBy(0.1,cc.p(self.moveLen,self.jumpMoveHeight));
                    var jump2 = cc.moveBy(0.2,cc.p(0,-self.jumpMoveHeight));
                    self.player.runAction(cc.sequence(jump1,jump2));
                }
                //向左移动
                if(locationInNode.x < 0 && self.player.x > -self.node.width/2 + self.wallWidth-20){
                    cc.audioEngine.play(self.jumpGoAduio,false,0.5);
                    var jump1 = cc.moveBy(0.1,cc.p(-self.moveLen,self.jumpMoveHeight));
                    var jump2 = cc.moveBy(0.2,cc.p(0,-self.jumpMoveHeight));
                    self.player.runAction(cc.sequence(jump1,jump2));
                }
                return true;
            },
        };
        cc.eventManager.addListener(listener,self.player);
    },
    onLoad () {
        cc.director.preloadScene("GameOver");
        cc.audioEngine.play(this.bgAduio,true,0.2);
        this.blinkCount = 3;
        this.init();
        this.moveControll();
        this.jumpControll();
        this.newGhostTime();
    },
    update (dt) {
        // console.log(this.player.y + "   "+this.node.height/2);
        if(this.player.y > this.node.height/2 -20){
            cc.director.loadScene("GameOver");
        }
    },
});
