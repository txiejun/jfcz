var MethodInfo = (function () {
    function MethodInfo(thisObj, method, delay, repeatCount, lastTime, repeatTimes, param) {
        /**
            *	延迟时间 相对于mainDelay
            */
        this.delay = 0;
        /**
            *	重复次数
            */
        this.repeatCount = 0;
        /**
            *	上次执行的时间
            */
        this.lastTime = 0;
        /**
            *	当前重复的次数
            */
        this.repeatTimes = 0;
        this.handler = new Handler(thisObj, method, param);
        this.delay = delay;
        this.repeatCount = repeatCount;
        this.lastTime = lastTime;
        this.repeatTimes = repeatTimes;
    }
    MethodInfo.prototype.resetParam = function (param) {
        if (this.handler) {
            this.handler.params = param;
        }
    };
    MethodInfo.prototype.dispose = function () {
        if (this.handler) {
            this.handler.unload();
            this.handler = null;
        }
        this.delay = 0;
        this.repeatCount = 0;
        this.lastTime = 0;
        this.repeatTimes = 0;
    };
    return MethodInfo;
})();
//# sourceMappingURL=MethodInfo.js.map