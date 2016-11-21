var Handler = (function () {
    function Handler(thisObj, handler, params) {
        if (params === void 0) { params = null; }
        this._handler = handler;
        this._params = params;
        this._thisObj = thisObj;
    }
    Handler.prototype.execute = function (isUnload) {
        if (isUnload === void 0) { isUnload = false; }
        if (this._handler != null) {
            this._handler.apply(this._thisObj, this._params);
            if (isUnload) {
                this.unload();
            }
        }
    };
    Handler.prototype.executeByParams = function (params) {
        if (this._handler != null) {
            this._handler.apply(this._thisObj, params);
        }
    };
    Handler.prototype.unload = function () {
        this._handler = null;
        this._params = null;
        this._thisObj = null;
    };
    Object.defineProperty(Handler.prototype, "handler", {
        get: function () {
            return this._handler;
        },
        set: function (value) {
            this._handler = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Handler.prototype, "params", {
        get: function () {
            return this._params;
        },
        set: function (value) {
            this._params = value;
        },
        enumerable: true,
        configurable: true
    });
    return Handler;
})();
//# sourceMappingURL=Handler.js.map