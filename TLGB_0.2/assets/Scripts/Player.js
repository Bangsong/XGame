var gameObj = require("GameMainControll");
cc.Class({
    extends: cc.Component,

    properties: {
        jumpAudio:{
            url:cc.AudioClip,
            default:null
        },
        touchAudio:{
            url:cc.AudioClip,
            default:null
        },
        jumpHeight:{
            type:cc.Integer,
            default:90
        },
        moveSpeed:{
            type:cc.Integer,
            default:40
        },
        moveJump:{
            type:cc.Integer,
            default:10
        },
        playerY:{
            type:cc.Integer,
            default:-240
        },
        _toucheTime:1,
        _bound:464,
    },

    playerControll () {
        var self = this;
        var scheduler = cc.director.getScheduler();
        scheduler.schedule(function(){
            self._toucheTime++;
        },self,0.2);
        var Id;
        var PlayerScaleToSmall = cc.scaleTo(0.5,0.7,0.8);
        var PlayerScaleToBig = cc.scaleTo(0.3,0.8,0.9);
        var PlayerTouch = cc.repeatForever(cc.sequence(PlayerScaleToSmall,PlayerScaleToBig));
        //触摸开始
        self.node.on(cc.Node.EventType.TOUCH_START,function(){
            self._toucheTime = 1;
            scheduler.resumeTarget(self);
            self.node.runAction(PlayerTouch);
            Id = cc.audioEngine.play(self.touchAudio,true,0.5);
            scheduler.unscheduleUpdateForTarget(self);
        });
        //触摸结束
        self.node.on(cc.Node.EventType.TOUCH_END,function(){
            var jumpHeight = self.jumpHeight * self._toucheTime;
            scheduler.pauseTarget(self);
            cc.audioEngine.stop(Id);
            self.node.stopAction(PlayerTouch);
            var PlayerReverse = cc.scaleTo(0.2,1,1);
            self.node.runAction(PlayerReverse);
            cc.audioEngine.play(self.jumpAudio,false,0.5);
            var PlayerMoveByUp = cc.moveBy(0.5,0,jumpHeight);
            var PlayerMoveByDown = cc.moveBy(0.45,0,-jumpHeight);
            self.node.runAction(cc.sequence(PlayerMoveByUp,PlayerMoveByDown));
        });
        //触摸移动结束
        self.node.on(cc.Node.EventType.TOUCH_CANCEL,function(){
            var jumpHeight = self.jumpHeight * self._toucheTime;
            scheduler.pauseTarget(self);
            cc.audioEngine.stop(Id);
            self.node.stopAction(PlayerTouch);
            var PlayerReverse = cc.scaleTo(0.2,1,1);
            self.node.runAction(PlayerReverse);
            cc.audioEngine.play(self.jumpAudio,false,0.5);
            var PlayerMoveByUp = cc.moveBy(0.5,0,jumpHeight);
            var PlayerMoveByDown = cc.moveBy(0.45,0,-jumpHeight);
            self.node.runAction(cc.sequence(PlayerMoveByUp,PlayerMoveByDown));
        });
        var game = cc.find("Canvas").getComponent(gameObj);
        var listener = {
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan:function(touches,event){
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touches.getLocation());
                var playerNowX = self.node.x;
                var gameMinX = (-game.node.width/2 + 15);
                var gameMaxX = (game.node.width/2 - 15);
                //向右移动
                if(locationInNode.x > 30 && playerNowX < gameMaxX){
                    //判断当前跳跃是否超过界限
                    var realSpeed = self._bound - (playerNowX + self.moveSpeed);
                    if(realSpeed < 0)
                        realSpeed = self.moveSpeed + realSpeed;
                    else
                        realSpeed = self.moveSpeed;
                    cc.audioEngine.play(self.jumpAudio,false,0.5);
                    var jumpUp = cc.moveBy(0.1,cc.p(realSpeed,self.moveJump));
                    var jumpDown = cc.moveBy(0.2,cc.p(0,-self.moveJump));
                    self.node.runAction(cc.sequence(jumpUp,jumpDown));
                }
                //向左移动
                if(locationInNode.x < 0 && playerNowX > gameMinX){
                    //判断当前跳跃是否超过界限
                    var realSpeed = (playerNowX - self.moveSpeed) + self._bound;
                    if(realSpeed < 0)
                        realSpeed = self.moveSpeed + realSpeed;
                    else
                        realSpeed = self.moveSpeed;
                    cc.audioEngine.play(self.jumpAudio,false,0.5);
                    var jumpUp = cc.moveBy(0.1,cc.p(-realSpeed,self.moveJump));
                    var jumpDown = cc.moveBy(0.2,cc.p(0,-self.moveJump));
                    self.node.runAction(cc.sequence(jumpUp,jumpDown));
                }
                return true;
            },
        };
        cc.eventManager.addListener(listener,self.node);
    },

    onCollisionEnter: function (other) {
        // console.log("发生碰撞");
        // console.log(this.node.y + "   "+ other.node.x);
        // console.log("this.node.y : "+ this.node.y + "this.playerY + 50: " + (this.playerY + 50))
        if(this.node.y < this.playerY+3){
            var score = cc.find("Canvas/scoreNode/score").getComponent(cc.Label);
            cc.sys.localStorage.setItem("score",parseInt(score.string) - 1);//此处-1，因为Npc发生碰撞时会+1
            cc.director.loadScene("GameOver");
        }
    },

    onLoad () {
        cc.director.preloadScene("GameOver");
        this.playerControll();
    },
});
