//针头
class NeedleHead extends egret.Sprite {

    public constructor() {
        super();
        this.width = 22;
        this.height = 22;
        
        this.initView();
    }

    private initView(): void {
        this.graphics.beginFill(0x000000, 1);
        this.graphics.drawCircle(0, 0, 10);
        this.graphics.endFill();
    }

    public dispose(): void {
        this.graphics.clear();
    }

} 