var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CircleLayout = (function (_super) {
    __extends(CircleLayout, _super);
    function CircleLayout(centerPoint, groupEls, startAngle, radius) {
        _super.call(this);
        this.centerPoint = centerPoint;
        this.layoutEls = groupEls;
        this.startAngle = startAngle;
        this.radiusX = radius;
    }
    CircleLayout.prototype.layout = function () {
        var len = this.layoutEls.length;
        this.disAngle = 360 / len;
        for (var i = 0; i < len; i++) {
            var tempRaian = this.startAngle * Math.PI / 180;
            var node = (this.layoutEls[i]);
            node.x = this.centerPoint.x + Math.cos(tempRaian) * this.radiusX;
            node.y = this.centerPoint.y + Math.sin(tempRaian) * this.radiusX;
            //角度增加
            this.startAngle += this.disAngle;
        }
    };
    return CircleLayout;
})(BaseLayout);
//# sourceMappingURL=CircleLayout.js.map