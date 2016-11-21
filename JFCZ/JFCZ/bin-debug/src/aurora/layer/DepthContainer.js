var DepthContainer = (function () {
    function DepthContainer() {
        this._layerList = new Array();
    }
    DepthContainer.prototype.compareDepth = function (a, b) {
        var result = 0;
        if (a.depth < b.depth) {
            result = -1;
        }
        else if (a.depth > b.depth) {
            result = 1;
        }
        return result;
    };
    /**
        * 注册容器 - 表明 IDepth是显示对象 否则不要注册此容器
        * @param container
        *
        */
    DepthContainer.prototype.register = function (container) {
        this._container = container;
    };
    DepthContainer.prototype.getContainer = function () {
        return this._container;
    };
    DepthContainer.prototype.getLayerList = function () {
        return this._layerList;
    };
    DepthContainer.prototype.push = function (layer) {
        if (this._layerList.indexOf(layer) == -1) {
            this._layerList.push(layer);
        }
    };
    DepthContainer.prototype.sortLayers = function () {
        this._layerList.sort(this.compareDepth);
        if (this._container) {
            var len = this._layerList.length;
            for (var i = 0; i < len; ++i) {
                this._container.addChild((this._layerList[i]));
            }
        }
    };
    DepthContainer.prototype.addLayer = function (layer) {
        if (layer) {
            if (this._layerList.indexOf(layer) == -1) {
                this._layerList.push(layer);
                this.sortLayers();
            }
        }
    };
    DepthContainer.prototype.removeLayer = function (layer, sort) {
        if (sort === void 0) { sort = true; }
        if (layer) {
            var index = this._layerList.indexOf(layer);
            if (index != -1) {
                this._layerList.splice(index, 1);
                if (this._container && this._container == layer.parent) {
                    layer.parent.removeChild(layer);
                }
                if (sort) {
                    this.sortLayers();
                }
            }
        }
    };
    /**
        * 交换对象在显示列表中的深度
        * 交换深度值-交换数组中顺序-交换显示列表深度
        * @param a
        * @param b
        *
        */
    DepthContainer.prototype.swapLayer = function (a, b) {
        if (a && b) {
            var aDepth = a.depth;
            var aIndex = this._layerList.indexOf(a);
            var bIndex = this._layerList.indexOf(b);
            if (aIndex >= 0 && bIndex >= 0) {
                a.depth = b.depth;
                b.depth = aDepth;
                this._layerList[aIndex] = b;
                this._layerList[bIndex] = a;
                if (this._container && this._container.contains(a) && this._container.contains(b)) {
                    this._container.swapChildren(a, b);
                }
            }
        }
    };
    DepthContainer.prototype.getLayer = function (depth) {
        if (depth === void 0) { depth = 0; }
        var result = null;
        var len = this._layerList.length;
        for (var i = 0; i < len; ++i) {
            if (this._layerList[i].depth == depth) {
                result = this._layerList[i];
                break;
            }
        }
        return result;
    };
    /**
        * 是否调用清除
        * @param isDispose
        *
        */
    DepthContainer.prototype.clearLayer = function (isDispose) {
        if (isDispose === void 0) { isDispose = false; }
        var len = this._layerList.length;
        var target;
        for (var i = 0; i < len; ++i) {
            target = (this._layerList[i]);
            if (target && this._container && this._container == target.parent) {
                target.parent.removeChild(target);
                if (isDispose && target != null /*&& target instanceof aurora.IDisposable*/) {
                    target.dispose();
                }
            }
        }
        this._layerList.length = 0;
    };
    return DepthContainer;
})();
//# sourceMappingURL=DepthContainer.js.map