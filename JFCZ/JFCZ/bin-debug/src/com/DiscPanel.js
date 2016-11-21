var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
//圆盘容器
var DiscPanel = (function (_super) {
    __extends(DiscPanel, _super);
    function DiscPanel() {
        _super.call(this);
        this.width = 100;
        this.height = 100;
        this.initView();
    }
    DiscPanel.prototype.initView = function () {
        this.disc = new Disc();
        this.addChild(this.disc);
    };
    DiscPanel.prototype.dispose = function () {
        this.graphics.clear();
    };
    return DiscPanel;
})(egret.Sprite);
//# sourceMappingURL=DiscPanel.js.map