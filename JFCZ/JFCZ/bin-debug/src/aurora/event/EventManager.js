var EventManager = (function () {
    function EventManager() {
        this.observers = null;
        this.mapping = null;
        this.observers = {};
        this.mapping = {};
    }
    EventManager.getInstance = function () {
        if (EventManager.instance == null) {
            EventManager.instance = new EventManager();
        }
        return EventManager.instance;
    };
    /**
        *
        * @param type
        * @param listener
        * @param module
        * @param method
        * 以后优化：增加优先级功能priority
        */
    EventManager.prototype.add = function (thisObj, type, listener, module, method) {
        if (module === void 0) { module = null; }
        if (method === void 0) { method = null; }
        var funcs = this.observers[type];
        if (funcs == null) {
            funcs = new Array();
            this.observers[type] = funcs;
        }
        else {
            if (EventManager.getInstance().getHandlerIndex(funcs, listener) != -1) {
                return;
            }
        }
        funcs.push(new Handler(thisObj, listener));
        this.mapping[listener] = { 'module': module, 'method': method };
    };
    EventManager.prototype.remove = function (type, listener) {
        var funcs = this.observers[type];
        if (funcs) {
            var index = EventManager.getInstance().getHandlerIndex(funcs, listener);
            if (index != -1) {
                funcs.splice(index, 1);
            }
        }
        delete this.mapping[listener];
    };
    /**
        * execute在调用每个回调函数的时候 中途可能会导致当前正在执行的列表长度发生改变(增加或减少)
        * 解决方案一：每次执行前，拷贝一个副本进行处理，
        * 解决方案二：采用倒序执行（只能适合对没有优先级要求的需求）
        * @param type
        * @param args
        *
        */
    EventManager.prototype.execute = function (type, args) {
        if (args === void 0) { args = null; }
        var funcs = this.observers[type];
        if (funcs && funcs.length > 0) {
            var list = funcs.concat();
            var listener;
            var index = 0;
            var len = list.length;
            while (index < len) {
                listener = list[index];
                if (listener != null) {
                    listener.executeByParams(args);
                }
                ++index;
            }
            list = null;
        }
    };
    /**
        * 发送事件 - 支持更多参数传递
        * @param type 事件类型
        * @param args 参数列表
        *
        */
    EventManager.dispatchEvent = function (type, args) {
        if (args === void 0) { args = null; }
        EventManager.getInstance().execute(type, args);
    };
    /**
        * 注册事件监听
        * @param type 事件类型
        * @param listener 监听函数
        * @param module 模块名
        * @param method 方法名
        *
        */
    EventManager.addEvent = function (thisObj, type, listener, module, method) {
        if (module === void 0) { module = null; }
        if (method === void 0) { method = null; }
        EventManager.getInstance().add(thisObj, type, listener, module, method);
    };
    /**
        * listener == null 返回是否已经注册了type类似的侦听
        * listener != null 返回是否注册了此listener的侦听
        * @param type
        * @return
        *
        */
    EventManager.prototype.hasEvent2 = function (type, listener) {
        if (listener === void 0) { listener = null; }
        var result = false;
        var funcs = this.observers[type];
        if (funcs) {
            if (listener == null) {
                result = true;
            }
            else {
                var index = EventManager.getInstance().getHandlerIndex(funcs, listener);
                if (index != -1) {
                    result = true;
                }
            }
        }
        return result;
    };
    EventManager.prototype.getHandlerIndex = function (funcs, h) {
        var result = -1;
        if (funcs && h) {
            var len = funcs.length;
            var item = null;
            for (var i = 0; i < len; ++i) {
                item = funcs[i];
                if (item && item.handler == h) {
                    result = i;
                    break;
                }
            }
        }
        return result;
    };
    EventManager.hasEvent = function (type, listener) {
        if (listener === void 0) { listener = null; }
        return EventManager.getInstance().hasEvent2(type, listener);
    };
    /**
        * 删除事件监听
        * @param type 事件类型
        * @param listener 监听函数
        *
        */
    EventManager.removeEvent = function (type, listener) {
        EventManager.getInstance().remove(type, listener);
    };
    EventManager.instance = null;
    return EventManager;
})();
//# sourceMappingURL=EventManager.js.map