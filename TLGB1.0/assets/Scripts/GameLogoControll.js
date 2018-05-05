cc.Class({
    extends: cc.Component,

    properties: {
        bar:{
            type:cc.ProgressBar,
            default:null
        },
    },
    onLoad () {
        cc.director.preloadScene("GameStart");
    },
    updateBar (dt) {
        var progress = this.bar.progress;
        if(progress < 1.0){
            progress += dt * 1;
        }
        else {
            cc.director.loadScene("GameStart");
        }
        this.bar.progress = progress;
    },
    update (dt) {
        this.updateBar(dt);
    },
});
