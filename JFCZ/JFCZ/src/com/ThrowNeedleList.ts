//抛针列表
class ThrowNeedleList extends egret.Sprite {

    private list: Array<ThrowNeedle>;

    public constructor() {
        super();
        this.width = 22;
        this.height = 100;

        this.list = new Array<ThrowNeedle>();
    }

    public pushNeedle(num: number): void {
        this.clear();
        console.log("pushNeedle.num:" + num);
        var needle: ThrowNeedle;
        for (var i: number = 0; i < num; ++i) {
            needle = new ThrowNeedle();
            needle.setNum(num - i);
            this.addChild(needle);
            this.list.push(needle);
        }

        LayoutUtil.layoutVectical(this, 10);
    }

    public popNeedle(): ThrowNeedle {
        var result: ThrowNeedle = null;
        if (this.list && this.list.length >0) {
            result = this.list.shift();
            if (result && result.parent) {
                result.parent.removeChild(result);

                LayoutUtil.layoutVectical(this, 10);
            }
        }

        return result;
    }

    public getLeftNum(): number {
        if (this.list) {
            return this.list.length;
        }
        else {
            return 0;
        }
    }

    public clear(): void {
        if (this.list) {
            var len: number = this.list.length;
            var n: ThrowNeedle;
            for (var i: number = 0; i < len; ++i) {
                n = this.list[i];
                if (n) {
                    n.dispose();
                }
            }
        }
        this.list = Array<ThrowNeedle>();
    }

    public dispose(): void {
        this.clear();
    }

}
