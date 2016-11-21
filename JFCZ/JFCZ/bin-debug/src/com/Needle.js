var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//针
var Needle = (function (_super) {
    __extends(Needle, _super);
    function Needle() {
        _super.call(this);
        this.width = 22;
        this.height = 150;
        this.anchorOffsetX = 0;
        this.anchorOffsetY = 150;
        this.initView();
    }
    Needle.prototype.initView = function () {
        this.head = new NeedleHead();
        this.addChild(this.head);
        this.line = new egret.Sprite();
        this.addChild(this.line);
        var graphics = this.line.graphics;
        graphics.beginFill(0x000000, 1);
        graphics.drawRect(0, 0, 1, this.height);
        graphics.endFill();
        this.line.x = 0;
        this.line.y = 0;
    };
    Needle.prototype.setRotation = function (value) {
        this.rotation = value;
    };
    Needle.prototype.getHitBox = function () {
        if (this.head) {
            var pos = this.localToGlobal(this.head.x, this.head.y);
            return new egret.Rectangle(pos.x, pos.y, this.head.width, this.head.height);
        }
        else {
            return null;
        }
    };
    Needle.prototype.dispose = function () {
        this.graphics.clear();
        if (this.head) {
            this.head.dispose();
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return Needle;
})(egret.Sprite);
//# sourceMappingURL=Needle.js.map