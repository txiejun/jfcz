var LayerManager = (function () {
    function LayerManager() {
    }
    /**
        * 注册整个层的根
        * @param r
        *
        */
    LayerManager.initialize = function (r) {
        LayerManager._container.register(r);
    };
    /**
        * 构建游戏层次 - 此处并没有一开始就构建worldLayer
        *
        */
    LayerManager.createMainLayer = function () {
        if (LayerManager.initialized == false) {
            LayerManager.initialized = true;
            LayerManager.worldLayer = new Layer(LayerConst.DEPTH_WORLD);
            LayerManager.worldLayer.name = "worldLayer";
            LayerManager.uiLayer = new Layer(LayerConst.DEPTH_UI);
            LayerManager.popUpLayer = new Layer(LayerConst.DEPTH_POPUP);
            LayerManager.popUpLayer.name = "popUpLayer";
            LayerManager.guideLayer = new Layer(LayerConst.DEPTH_GUILD);
            LayerManager.guideLayer.name = "guideLayer";
            LayerManager.topLayer = new Layer(LayerConst.DEPTH_TOP);
            LayerManager.topLayer.name = "topLayer";
            LayerManager.toolTipLayer = new Layer(LayerConst.DEPTH_TOOLTIP);
            LayerManager.toolTipLayer.name = "toolTipLayer";
            LayerManager.cursorLayer = new Layer(LayerConst.DEPTH_CURSOR);
            LayerManager.cursorLayer.name = "cursorLayer";
            LayerManager._container.push(LayerManager.worldLayer);
            LayerManager._container.push(LayerManager.uiLayer);
            LayerManager._container.push(LayerManager.popUpLayer);
            LayerManager._container.push(LayerManager.guideLayer);
            LayerManager._container.push(LayerManager.topLayer);
            LayerManager._container.push(LayerManager.toolTipLayer);
            LayerManager._container.push(LayerManager.cursorLayer);
            LayerManager._container.sortLayers();
        }
    };
    LayerManager.sortLayers = function () {
        LayerManager._container.sortLayers();
    };
    LayerManager.addLayer = function (layer) {
        if (layer) {
            if (layer.depth == LayerConst.DEPTH_WORLD) {
                //添加地图层
                //					worldLayer = layer;
                LayerManager.worldLayer.addChild(layer);
            }
            else if (layer.depth == LayerConst.DEPTH_UI) {
                //UI层
                LayerManager.uiLayer = layer;
            }
            if (layer.depth != LayerConst.DEPTH_WORLD) {
                LayerManager._container.addLayer(layer);
            }
        }
    };
    LayerManager.removeLayer = function (layer) {
        if (layer && layer.depth == LayerConst.DEPTH_WORLD) {
            //删除地图层
            LayerManager.worldLayer = null;
        }
        LayerManager._container.removeLayer(layer);
    };
    LayerManager.getLayer = function (depth) {
        if (depth === void 0) { depth = 0; }
        return (LayerManager._container.getLayer(depth));
    };
    LayerManager.swapLayer = function (a, b) {
        LayerManager._container.swapLayer(a, b);
    };
    LayerManager.clearLayer = function () {
        LayerManager._container.clearLayer();
    };
    LayerManager._container = new DepthContainer();
    /**
        * 是否已经初始化
        */
    LayerManager.initialized = false;
    return LayerManager;
})();
//# sourceMappingURL=LayerManager.js.map