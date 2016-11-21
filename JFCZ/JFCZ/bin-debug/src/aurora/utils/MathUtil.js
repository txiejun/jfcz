var MathUtil = (function () {
    function MathUtil() {
    }
    /**
        * 获得一个 范围内的 随机整数
        * @param min
        * @param max
        * @return
        *
        */
    MathUtil.random = function (min, max) {
        if (max === void 0) { max = 0; }
        return Math.round(Math.random() * (max - min)) + min;
    };
    /**
        * 通过角度获得弧度
        * @param angle
        * @return
        *
        */
    MathUtil.getRadian = function (angle) {
        return angle * Math.PI / 180;
    };
    /**
        * 通过弧度获得角度
        * @param radian
        * @return
        *
        */
    MathUtil.getAngle = function (radian) {
        return radian * 180 / Math.PI;
    };
    /**
        * 获得两点之间的弧度
        * @param pos 起点
        * @param dest 终点
        * @return
        *
        */
    MathUtil.getRadianByLine = function (pos, dest) {
        var result = 0;
        if (pos && dest) {
            result = Math.atan2(dest.y - pos.y, dest.x - pos.x);
        }
        return result;
    };
    /**
        * 获得两点之间的角度
        * @param pos 起点
        * @param dest 终点
        * @return
        *
        */
    MathUtil.getAngleByLine = function (pos, dest) {
        return MathUtil.getAngle(MathUtil.getRadianByLine(pos, dest));
    };
    return MathUtil;
})();
//# sourceMappingURL=MathUtil.js.map