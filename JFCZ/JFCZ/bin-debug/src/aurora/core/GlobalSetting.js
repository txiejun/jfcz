var GlobalSetting = (function () {
    function GlobalSetting() {
    }
    /**
        * 注册游戏根-Main
        * @param r
        *
        */
    GlobalSetting.initialize = function (r) {
        GlobalSetting.root = r;
        GlobalSetting.mainGame = r;
        if (GlobalSetting.root) {
            GlobalSetting.stage = GlobalSetting.root.stage;
            GlobalSetting.gameWidth = GlobalSetting.stage.stageWidth;
            GlobalSetting.gameHeight = GlobalSetting.stage.stageHeight;
        }
        else {
            throw new Error("GlobalSetting initialize error, root can't been null!");
        }
    };
    /**
        * 获得路径
        * @param url
        * @return
        *
        */
    GlobalSetting.getRootPath = function (url) {
        var result = "";
        if (url) {
            result = url;
            var index = result.indexOf("?");
            if (index != -1) {
                result = result.substring(0, index);
            }
            index = result.lastIndexOf(".");
            if (index != -1) {
                result = result.substring(0, index);
            }
            index = result.lastIndexOf("/");
            if (index <= 0) {
                index = result.lastIndexOf("\\");
            }
            if (index != -1) {
                result = result.substring(0, index + 1);
            }
        }
        return result;
    };
    /**
        * 游戏根
        */
    GlobalSetting.root = null;
    /**
        * 游戏根目录
        */
    GlobalSetting.rootPath = "";
    /**
        * 后端指定的状态 表示是否为内网还是外网服务器 比如： isDebug=true可以打开GM命令 进行调试等
        */
    GlobalSetting.isDebug = false;
    /**
        * 是否为前端调试状态 与后端不相关的调试 比如直接使用前端本地文件resource目录下的资源，js等；
        */
    GlobalSetting.localDebug = false;
    /**
        *是否抛出异常
        */
    GlobalSetting.showException = false;
    /**
        * 游戏舞台
        */
    GlobalSetting.stage = null;
    /**
        * 游戏当前屏幕宽度
        */
    GlobalSetting.stageWidth = 0;
    /**
        * 游戏当前屏幕高度
        */
    GlobalSetting.stageHeight = 0;
    /**
        * flash传递过来的参数
        */
    GlobalSetting.parameters = null;
    /**
        * 帧率
        */
    GlobalSetting.frameRate = 60;
    /**
        *版本
        */
    GlobalSetting.version = 0;
    /**
        * 游戏的宽度
        */
    GlobalSetting.gameWidth = 720;
    /**
        * 游戏的高度
        */
    GlobalSetting.gameHeight = 1200;
    /**
        * 游戏最小宽度
        */
    GlobalSetting.minWidth = 100;
    /**
        * 游戏最小高度
        */
    GlobalSetting.minHeight = 100;
    /**
        * 游戏最大宽度
        */
    GlobalSetting.maxWidth = 2000;
    /**
        * 游戏最大高度
        */
    GlobalSetting.maxHeight = 2000;
    GlobalSetting.appScale = 1;
    return GlobalSetting;
})();
//# sourceMappingURL=GlobalSetting.js.map