var TimerManager = (function () {
    function TimerManager() {
    }
    TimerManager.initialize = function (s) {
        TimerManager._stage = s;
        if (TimerManager._stage) {
            TimerManager._stage.addEventListener(egret.Event.ENTER_FRAME, TimerManager.frameLoop, TimerManager);
        }
    };
    Object.defineProperty(TimerManager, "mainTimer", {
        get: function () {
            if (TimerManager._mainTimer == null) {
                TimerManager._mainTimer = new egret.Timer(TimerManager.mainDelay);
                TimerManager._mainTimer.addEventListener(egret.TimerEvent.TIMER, TimerManager.doTimer, TimerManager);
            }
            return TimerManager._mainTimer;
        },
        enumerable: true,
        configurable: true
    });
    TimerManager.doTimer = function (evt) {
        var count = 0;
        var funObj;
        var newList = TimerManager.timerList.concat();
        var len = newList.length;
        var key;
        for (var i = 0; i < len; ++i) {
            count++;
            key = newList[i];
            funObj = TimerManager.timerLoops[key];
            if (funObj != null && funObj.handler != null) {
                var nowTime = egret.getTimer();
                var gapTime = nowTime - funObj.lastTime;
                if (gapTime >= funObj.delay) {
                    if (funObj.repeatCount <= 0 || (funObj.repeatCount > 0 && funObj.repeatTimes < funObj.repeatCount)) {
                        funObj.lastTime = nowTime;
                        funObj.repeatTimes++;
                        funObj.handler.execute();
                    }
                    else {
                        //清除
                        TimerManager.removeFunction(key);
                    }
                }
            }
        }
        newList = null;
        //如果没有函数需要执行 则关闭mainTimer
        if (count == 0) {
            TimerManager.mainTimer.reset();
            TimerManager.mainTimer.stop();
        }
    };
    /**
        * 帧频循环-[待优化：单个循环里面操作影响到循环列表的长度会有问题]
        * @param e
        *
        */
    TimerManager.frameLoop = function (event) {
        var i = null;
        var len = TimerManager.nextFrameList.length;
        var key;
        for (var j = 0; j < len; ++j) {
            key = TimerManager.nextFrameList[j];
            i = TimerManager.nextFrames[key];
            if (i) {
                i.execute();
                i.unload();
                i = null;
            }
            TimerManager.nextFrameList.splice(j, 1);
            delete TimerManager.nextFrames[key];
            --len;
            --j;
        }
        i = null;
        var newList = TimerManager.frameList.concat();
        len = newList.length;
        for (j = 0; j < len; ++j) {
            key = newList[j];
            i = TimerManager.frameLoops[key];
            if (i) {
                i.execute();
            }
        }
        newList = null;
        TimerManager.doFrameRate();
    };
    /**
        * 添加 timer 回调函数注册
        * @param thisObj
        * @param func 回调函数
        * @param delay 计时器事件间的延迟（以毫秒为单位）。  最小值为20 ms 最好是20的倍数 默认间隔为1秒
        * @param repeatCount 指定重复次数。如果为 0，则计时器重复无限次数。如果不为 0，则将运行计时器，运行次数为指定的次数，然后停止。
        *
        */
    TimerManager.addFunction = function (thisObj, func, delay, repeatCount, param) {
        if (delay === void 0) { delay = 1000; }
        if (repeatCount === void 0) { repeatCount = 0; }
        if (param === void 0) { param = null; }
        if (func == null) {
            return;
        }
        TimerManager.addFuncByKey(thisObj, func, func, delay, repeatCount, param);
        if (TimerManager.mainTimer.running == false) {
            TimerManager.mainTimer.start();
        }
    };
    TimerManager.addFuncByKey = function (thisObj, key, func, delay, repeatCount, param) {
        if (delay === void 0) { delay = 1000; }
        if (repeatCount === void 0) { repeatCount = 0; }
        if (param === void 0) { param = null; }
        var info = TimerManager.timerLoops[key];
        if (info) {
            info.delay = delay;
            info.repeatCount = repeatCount;
            info.resetParam(param);
        }
        else {
            info = new MethodInfo(thisObj, func, delay, repeatCount, egret.getTimer(), 0, param);
            TimerManager.timerLoops[key] = info;
        }
        var index = TimerManager.timerList.indexOf(key);
        if (index != -1) {
            //有记录, 提升次序
            TimerManager.timerList.splice(index, 1);
        }
        TimerManager.timerList.push(key);
    };
    /**
        * 删除函数注册
        * @param func
        *
        */
    TimerManager.removeFunction = function (key) {
        if (key != null) {
            var info = TimerManager.timerLoops[key];
            if (info) {
                delete TimerManager.timerLoops[key];
                info.dispose();
                info = null;
            }
            var index = TimerManager.timerList.indexOf(key);
            if (index != -1) {
                //有记录, 提升次序
                TimerManager.timerList.splice(index, 1);
            }
        }
    };
    /**
        * 是否已经注册了timer回调函数
        * @param func
        * @return
        *
        */
    TimerManager.hasFunction = function (func) {
        if (TimerManager.timerLoops[func] != null) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
        * 加入一个方法 在下一帧触发
        * @param method
        * @param args
        *
        */
    TimerManager.addNextFrame = function (thisObj, method, args) {
        if (args === void 0) { args = null; }
        if (method != null) {
            if (TimerManager.nextFrames[method] == null) {
                TimerManager.nextFrames[method] = new Handler(thisObj, method, args);
            }
            var index = TimerManager.nextFrameList.indexOf(method);
            if (index != -1) {
                TimerManager.nextFrameList.splice(index, 1);
            }
            TimerManager.nextFrameList.push(method);
        }
    };
    /**
        * 加入到桢循环
        * @param method
        * @param args
        *
        */
    TimerManager.addToFrame = function (thisObj, method, args) {
        if (args === void 0) { args = null; }
        if (method == null) {
            return;
        }
        if (TimerManager.frameLoops[method] == null) {
            TimerManager.frameLoops[method] = new Handler(thisObj, method, args);
        }
        var index = TimerManager.frameList.indexOf(method);
        if (index != -1) {
            TimerManager.frameList.splice(index, 1);
        }
        TimerManager.frameList.push(method);
    };
    /**
        * 移除出桢循环
        * @param method
        *
        */
    TimerManager.removeFromFrame = function (method) {
        if (method == null) {
            return;
        }
        if (TimerManager.frameLoops[method]) {
            TimerManager.frameLoops[method].unload();
            TimerManager.frameLoops[method] = null;
            delete TimerManager.frameLoops[method];
            var index = TimerManager.frameList.indexOf(method);
            if (index != -1) {
                TimerManager.frameList.splice(index, 1);
            }
        }
    };
    TimerManager.hasFrame = function (method) {
        return TimerManager.frameLoops[method] != null;
    };
    /**
        * 模拟setTimeout
        * @param method
        * @param delay		单位毫秒
        * @param args
        *
        */
    TimerManager.setTimeout = function (thisObj, method, delay, args) {
        if (args === void 0) { args = null; }
        var result = 0;
        if (method != null) {
            result = ++TimerManager._timeoutIdCounter;
            TimerManager.addFuncByKey(thisObj, "timeout_" + result, method, delay, 1, args);
            if (TimerManager.mainTimer.running == false) {
                TimerManager.mainTimer.start();
            }
        }
        return result;
    };
    TimerManager.clearTimeout = function (id) {
        if (id === void 0) { id = 0; }
        TimerManager.removeFunction("timeout_" + id);
    };
    /**
        * 计算帧频
        *
        */
    TimerManager.doFrameRate = function () {
        var t = egret.getTimer();
        TimerManager._frameRate = 1000 / (t - TimerManager.lastTime);
        TimerManager.lastTime = t;
    };
    Object.defineProperty(TimerManager, "realRate", {
        /**
            * 获取最近的平均帧频
            * 记录了12个帧频，排除最快和最慢2个
            * @return
            *
            */
        get: function () {
            return TimerManager._frameRate;
        },
        enumerable: true,
        configurable: true
    });
    TimerManager.timerLoops = {};
    //用作保持先后顺序-只保存key
    TimerManager.timerList = new Array();
    TimerManager._timeoutIdCounter = 0;
    TimerManager.frameLoops = {};
    TimerManager.frameList = new Array();
    TimerManager.nextFrames = {};
    TimerManager.nextFrameList = new Array();
    TimerManager.mainDelay = 20; //minisecond
    TimerManager._stage = null;
    /**
        * 用于计算帧频
        */
    TimerManager.lastTime = 0;
    /**
        * 存放帧频
        */
    TimerManager._frameRate = 0;
    return TimerManager;
})();
//# sourceMappingURL=TimerManager.js.map