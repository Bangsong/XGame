"use strict";
cc._RF.push(module, 'a9beb/cxE9F6IU5sR+bysCn', 'PageViewControll');
// Scripts/PageViewControll.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        pageView: {
            type: cc.Node,
            default: null
        }
    },
    onLoad: function onLoad() {
        // var self = this;
        // cc.director.getScheduler().schedule(function(){
        //     var viewCount = self.pageView.getPages().length;
        //     var viewIndex = self.pageView.getCurrentPageIndex();
        //     viewIndex = viewIndex >=viewCount ? 0: viewIndex + 1;
        //     self.pageView.scrollToPage(viewIndex,2);
        // },self,1,true);
    },
    update: function update(dt) {}
});

cc._RF.pop();