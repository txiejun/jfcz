var LayoutUtil = (function () {
    function LayoutUtil() {
    }
    /**
        * 垂直布局
        */
    LayoutUtil.layoutVectical = function (container, vpadding, startY) {
        if (vpadding === void 0) { vpadding = 0; }
        if (startY === void 0) { startY = 0; }
        if (!container)
            return;
        var size = container.numChildren;
        if (size == 0)
            return;
        var y = startY;
        for (var i = 0; i < size; i++) {
            var child = container.getChildAt(i);
            child.y = y;
            y = child.height + child.y + vpadding;
        }
    };
    /**
        * 水平布局
        * @param container 容易
        * @param hpadding 间隔
        * @param startX 起始坐标
        * @param $isNeedWidth 是否在间隔上再加上子类的宽度 true为加上
        */
    LayoutUtil.layoutHorizontal = function (container, hpadding, startX, $isNeedWidth) {
        if (hpadding === void 0) { hpadding = 0; }
        if (startX === void 0) { startX = 0; }
        if ($isNeedWidth === void 0) { $isNeedWidth = true; }
        if (!container)
            return;
        var size = container.numChildren;
        if (size == 0)
            return;
        var x = startX;
        for (var i = 0; i < size; i++) {
            var child = container.getChildAt(i);
            child.x = x;
            if ($isNeedWidth) {
                x = child.width + child.x + hpadding;
            }
            else {
                x = child.x + hpadding;
            }
        }
    };
    /**
        * 网格布局
        * @param container
        * @param columnCount
        * @param hPadding
        * @param vPadding
        * @param offsetX
        * @param $isAddition	是否需要计算原始宽度
        * 	true	计算原始宽度
        * 	false	不计算原始宽度
        * @param $isAdditionHeight	是否需要计算原始高度
        * 	true	计算原始高度
        * 	false	不计算原始高度
        */
    LayoutUtil.layoutGrid = function (container, columnCount, hPadding, vPadding, offsetX, $isAdditionWidth, $isAdditionHeight) {
        if (offsetX === void 0) { offsetX = 0; }
        if ($isAdditionWidth === void 0) { $isAdditionWidth = true; }
        if ($isAdditionHeight === void 0) { $isAdditionHeight = true; }
        if (!container)
            return;
        var size = container.numChildren;
        if (size == 0)
            return;
        for (var i = 0; i < size; i++) {
            var child = container.getChildAt(i);
            var row = i / columnCount;
            var column = i % columnCount;
            child.x = ($isAdditionWidth ? (column * child.width) : 0) + column * hPadding + row * offsetX;
            child.y = ($isAdditionHeight ? (row * child.height) : 0) + row * vPadding;
        }
    };
    /**
        * 椭圆布局
        *
        */
    LayoutUtil.layoutEllipse = function (container, centerPoint, radiusX, radiusY, startAngle) {
        if (startAngle === void 0) { startAngle = 0; }
        if (!container)
            return;
        var size = container.numChildren;
        if (size == 0)
            return;
        var elements = [];
        for (var i = 0; i < size; i++) {
            elements.push(container.getChildAt(i));
        }
        var layout = new EllipseLayout(centerPoint, elements, startAngle, radiusX, radiusY);
        layout.layout();
    };
    /**
        * 圆形布局
        *
        */
    LayoutUtil.layoutCircle = function (container, centerPoint, radius, startAngle) {
        if (startAngle === void 0) { startAngle = 0; }
        if (!container)
            return;
        var size = container.numChildren;
        if (size == 0)
            return;
        var elements = [];
        for (var i = 0; i < size; i++) {
            elements.push(container.getChildAt(i));
        }
        var layout = new CircleLayout(centerPoint, elements, startAngle, radius);
        layout.layout();
    };
    /**
        * 扇形布局
        *
        */
    LayoutUtil.layoutCamber = function (container, centerPoint, radiusX, radiusY, startAngle, angleRange) {
        if (startAngle === void 0) { startAngle = 0; }
        if (angleRange === void 0) { angleRange = 180; }
        if (!container)
            return;
        var size = container.numChildren;
        if (size == 0)
            return;
        var elements = [];
        for (var i = 0; i < size; i++) {
            elements.push(container.getChildAt(i));
        }
        var layout = new CamberLayout(centerPoint, elements, startAngle, radiusX, radiusY, angleRange);
        layout.layout();
    };
    return LayoutUtil;
})();
//# sourceMappingURL=LayoutUtil.js.map