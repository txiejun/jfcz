var Engine = (function () {
    function Engine() {
    }
    /**
        * 初始化 - MainGame
        * @param root 游戏根
        *
        */
    Engine.initialize = function (root) {
        if (root == null) {
            throw ("Root is null, Engine initialize error.");
        }
        if (root.stage == null) {
            throw ("Can't get the stage.");
        }
        GlobalSetting.initialize(root);
        TimerManager.initialize(root.stage);
        LayerManager.initialize(root);
        LayerManager.createMainLayer();
    };
    Engine.VERSION = "1.0.0.0";
    return Engine;
})();
//# sourceMappingURL=Engine.js.map