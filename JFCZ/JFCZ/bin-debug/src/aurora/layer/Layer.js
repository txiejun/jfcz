var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Layer = (function (_super) {
    __extends(Layer, _super);
    function Layer(depth) {
        if (depth === void 0) { depth = 0; }
        _super.call(this);
        this.depth = 0;
        this.depth = depth;
    }
    return Layer;
})(egret.DisplayObjectContainer);
//# sourceMappingURL=Layer.js.map