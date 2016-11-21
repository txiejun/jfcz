var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//圆盘容器
var NeedlePanel = (function (_super) {
    __extends(NeedlePanel, _super);
    function NeedlePanel() {
        _super.call(this);
        this.needleList = null;
        this.count = 0;
        this.width = 300;
        this.height = 300;
        this.needleList = new Array();
        this.initView();
    }
    NeedlePanel.prototype.initView = function () {
    };
    NeedlePanel.prototype.reset = function (count) {
        this.count = count;
        this.clear();
        this.initDefault();
    };
    NeedlePanel.prototype.initDefault = function () {
        var needle;
        var gap = 360 / this.count;
        for (var i = 0; i < this.count; ++i) {
            needle = new Needle();
            this.addNeedle(needle);
            needle.setRotation(i * gap);
        }
    };
    NeedlePanel.prototype.addNeedle = function (needle) {
        if (needle) {
            this.addChild(needle);
            this.needleList.push(needle);
        }
    };
    NeedlePanel.prototype.removeNeedle = function (needle) {
        if (needle) {
            var index = this.needleList.indexOf(needle);
            if (index >= 0) {
                this.needleList.splice(index, 1);
                if (needle.parent) {
                    needle.parent.removeChild(needle);
                }
            }
        }
    };
    //碰撞检测
    NeedlePanel.prototype.checkHitTest = function (target) {
        var result = false;
        if (this.needleList && target) {
            var len = this.needleList.length;
            var item;
            var hitBox;
            var targetPos = target.localToGlobal(0, 0);
            var targetBox = new egret.Rectangle(targetPos.x, targetPos.y, target.width, target.height);
            var distance1 = 0;
            var distance2 = 0;
            for (var i = 0; i < len; ++i) {
                item = this.needleList[i];
                if (item) {
                    hitBox = item.getHitBox();
                    if (hitBox) {
                        distance1 = hitBox.width / 2 + targetBox.width / 2;
                        distance2 = egret.Point.distance(new egret.Point(hitBox.x, hitBox.y), new egret.Point(targetBox.x, targetBox.y));
                        console.log("hittest dis1:" + distance1 + ", dis2:" + distance2);
                        if (distance2 <= distance1) {
                            //碰撞了
                            result = true;
                            break;
                        }
                    }
                }
            }
        }
        return result;
    };
    NeedlePanel.prototype.clear = function () {
        if (this.needleList) {
            var len = this.needleList.length;
            var n;
            for (var i = 0; i < len; ++i) {
                n = this.needleList[i];
                if (n) {
                    n.dispose();
                }
            }
        }
        this.needleList = Array();
    };
    NeedlePanel.prototype.dispose = function () {
        this.graphics.clear();
        this.clear();
    };
    return NeedlePanel;
})(egret.Sprite);
//# sourceMappingURL=NeedlePanel.js.map