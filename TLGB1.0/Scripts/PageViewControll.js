cc.Class({
    extends: cc.Component,

    properties: {
        pageView:{
            type:cc.Node,
            default:null
        },
    },
    onLoad () {
        // var self = this;
        // cc.director.getScheduler().schedule(function(){
        //     var viewCount = self.pageView.getPages().length;
        //     var viewIndex = self.pageView.getCurrentPageIndex();
        //     viewIndex = viewIndex >=viewCount ? 0: viewIndex + 1;
        //     self.pageView.scrollToPage(viewIndex,2);
        // },self,1,true);
    },
    update (dt) {},
});
