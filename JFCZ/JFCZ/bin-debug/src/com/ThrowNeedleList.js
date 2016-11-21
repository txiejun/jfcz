var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//抛针列表
var ThrowNeedleList = (function (_super) {
    __extends(ThrowNeedleList, _super);
    function ThrowNeedleList() {
        _super.call(this);
        this.width = 22;
        this.height = 100;
        this.list = new Array();
    }
    ThrowNeedleList.prototype.pushNeedle = function (num) {
        this.clear();
        console.log("pushNeedle.num:" + num);
        var needle;
        for (var i = 0; i < num; ++i) {
            needle = new ThrowNeedle();
            needle.setNum(num - i);
            this.addChild(needle);
            this.list.push(needle);
        }
        LayoutUtil.layoutVectical(this, 10);
    };
    ThrowNeedleList.prototype.popNeedle = function () {
        var result = null;
        if (this.list && this.list.length > 0) {
            result = this.list.shift();
            if (result && result.parent) {
                result.parent.removeChild(result);
                LayoutUtil.layoutVectical(this, 10);
            }
        }
        return result;
    };
    ThrowNeedleList.prototype.getLeftNum = function () {
        if (this.list) {
            return this.list.length;
        }
        else {
            return 0;
        }
    };
    ThrowNeedleList.prototype.clear = function () {
        if (this.list) {
            var len = this.list.length;
            var n;
            for (var i = 0; i < len; ++i) {
                n = this.list[i];
                if (n) {
                    n.dispose();
                }
            }
        }
        this.list = Array();
    };
    ThrowNeedleList.prototype.dispose = function () {
        this.clear();
    };
    return ThrowNeedleList;
})(egret.Sprite);
//# sourceMappingURL=ThrowNeedleList.js.map