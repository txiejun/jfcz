var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//圆盘
var Disc = (function (_super) {
    __extends(Disc, _super);
    function Disc() {
        _super.call(this);
        this.width = 100;
        this.height = 100;
        this.initView();
    }
    Disc.prototype.initView = function () {
        this.graphics.beginFill(0x000000, 1);
        this.graphics.drawCircle(0, 0, this.width / 2);
        this.graphics.endFill();
        this.txtNum = new egret.TextField();
        this.addChild(this.txtNum);
        this.txtNum.x = -(this.width / 2);
        this.txtNum.y = -(this.height / 2);
        this.txtNum.width = this.width;
        this.txtNum.height = this.height;
        this.txtNum.size = 50;
        this.txtNum.textAlign = egret.HorizontalAlign.CENTER;
        this.txtNum.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.txtNum.bold = true;
    };
    /**
      * 设置数字
      * @param value
      */
    Disc.prototype.setNum = function (value) {
        if (this.txtNum) {
            this.txtNum.text = value.toString();
        }
    };
    Disc.prototype.dispose = function () {
        this.graphics.clear();
        if (this.txtNum) {
            this.txtNum.text = "";
        }
    };
    return Disc;
})(egret.Sprite);
//# sourceMappingURL=Disc.js.map