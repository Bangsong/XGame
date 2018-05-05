(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/PageViewControll.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a9beb/cxE9F6IU5sR+bysCn', 'PageViewControll', __filename);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=PageViewControll.js.map
        