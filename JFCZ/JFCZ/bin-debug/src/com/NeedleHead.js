var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//针头
var NeedleHead = (function (_super) {
    __extends(NeedleHead, _super);
    function NeedleHead() {
        _super.call(this);
        this.width = 22;
        this.height = 22;
        this.initView();
    }
    NeedleHead.prototype.initView = function () {
        this.graphics.beginFill(0x000000, 1);
        this.graphics.drawCircle(0, 0, 10);
        this.graphics.endFill();
    };
    NeedleHead.prototype.dispose = function () {
        this.graphics.clear();
    };
    return NeedleHead;
})(egret.Sprite);
//# sourceMappingURL=NeedleHead.js.map