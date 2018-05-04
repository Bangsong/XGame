cc.Class({
    extends: cc.Component,
    properties: {
        boomAudio:{
            url:cc.AudioClip,
            default:null
        },
    },
    onLoad () {},
    onCollisionEnter: function (other) {
        console.log("发生碰撞");
        cc.audioEngine.play(this.boomAudio,false,0.5);
        this.node.destroy();
    },
    update (dt) {
        var downSpeed = cc.random0To1() * 200 + 1;
        this.node.y--;
    },
});
