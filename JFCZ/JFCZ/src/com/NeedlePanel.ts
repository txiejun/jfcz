//圆盘容器
class NeedlePanel extends egret.Sprite {

    public needleList: Array<Needle> = null;
    private count: number = 0;

    public constructor() {
        super();
        this.width = 300;
        this.height = 300;
        this.needleList = new Array<Needle>();
        this.initView();
    }

    private initView(): void {
        
    }

    public reset(count: number): void {
        this.count = count;
        this.clear();
        this.initDefault();
    }

    public initDefault(): void {
        var needle: Needle;
        var gap: number = 360 / this.count;
        for (var i: number = 0; i < this.count; ++i) {
            needle = new Needle();
            this.addNeedle(needle);
            needle.setRotation(i * gap);
        }
        
    }

    public addNeedle(needle: Needle): void {
        if (needle) {
            this.addChild(needle);
            this.needleList.push(needle);
        }
    }

    public removeNeedle(needle: Needle): void {
        if (needle) {
            var index: number = this.needleList.indexOf(needle);
            if (index >= 0) {
                this.needleList.splice(index, 1);
                if (needle.parent) {
                    needle.parent.removeChild(needle);
                }
            }
        }
    }

    //碰撞检测
    public checkHitTest(target: ThrowNeedle): boolean {
        var result: boolean = false;
        if (this.needleList && target) {
            var len: number = this.needleList.length;
            var item: Needle;
            var hitBox: egret.Rectangle;
            var targetPos: egret.Point = target.localToGlobal(0, 0);
            var targetBox: egret.Rectangle = new egret.Rectangle(targetPos.x, targetPos.y, target.width, target.height);

            var distance1: number = 0;
            var distance2: number = 0;
            for (var i: number = 0; i < len; ++i) {
                item = this.needleList[i];
                if (item) {
                    hitBox = item.getHitBox();
                    if (hitBox) {
                        distance1 = hitBox.width/2 + targetBox.width/2;
                        distance2 = egret.Point.distance(new egret.Point(hitBox.x, hitBox.y), new egret.Point(targetBox.x, targetBox.y));


                        console.log("hittest dis1:" + distance1 + ", dis2:" + distance2);
                        if (distance2 <= distance1) {
                            //碰撞了
                            result = true;
                            break;
                        }
                    }
                }
            }
        }
        return result;
    }

    public clear(): void {
        if (this.needleList) {
            var len: number = this.needleList.length;
            var n: Needle;
            for (var i: number = 0; i < len; ++i) {
                n = this.needleList[i];
                if(n){
                    n.dispose();
                }
            }
        }
        this.needleList = Array<Needle>();
    }

    public dispose(): void {
        this.graphics.clear();
        this.clear();
    }

}
 