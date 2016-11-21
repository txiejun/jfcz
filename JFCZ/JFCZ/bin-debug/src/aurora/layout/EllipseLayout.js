var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EllipseLayout = (function (_super) {
    __extends(EllipseLayout, _super);
    function EllipseLayout(centerPoint, groupEls, startAngle, radiusX, radiusY) {
        _super.call(this, centerPoint, groupEls, startAngle, radiusX);
        this.radiusY = radiusY;
    }
    //布局算法 基本和圆形一样
    EllipseLayout.prototype.layout = function () {
        var len = this.layoutEls.length;
        this.disAngle = 360 / len;
        for (var i = 0; i < len; i++) {
            var tempRaian = this.startAngle * Math.PI / 180;
            var node = (this.layoutEls[i]);
            node.x = this.centerPoint.x + Math.cos(tempRaian) * this.radiusX;
            node.y = this.centerPoint.y + Math.sin(tempRaian) * this.radiusY;
            //角度增加
            this.startAngle += this.disAngle;
        }
    };
    return EllipseLayout;
})(CircleLayout);
//# sourceMappingURL=EllipseLayout.js.map