var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//抛出的针
var ThrowNeedle = (function (_super) {
    __extends(ThrowNeedle, _super);
    function ThrowNeedle() {
        _super.call(this);
        this.initView2();
    }
    ThrowNeedle.prototype.initView2 = function () {
        this.txtNum = new egret.TextField();
        this.addChild(this.txtNum);
        this.txtNum.x = -(this.width / 2);
        this.txtNum.y = -(this.height / 2);
        this.txtNum.width = this.width;
        this.txtNum.height = this.height;
        this.txtNum.size = 12;
        this.txtNum.textAlign = egret.HorizontalAlign.CENTER;
        this.txtNum.verticalAlign = egret.VerticalAlign.MIDDLE;
    };
    /**
      * 设置数字
      * @param value
      */
    ThrowNeedle.prototype.setNum = function (value) {
        if (this.txtNum) {
            this.txtNum.text = value.toString();
        }
    };
    ThrowNeedle.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this.txtNum) {
            this.txtNum.text = "";
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return ThrowNeedle;
})(NeedleHead);
//# sourceMappingURL=ThrowNeedle.js.map