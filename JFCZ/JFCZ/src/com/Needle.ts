//针
class Needle extends egret.Sprite {
    private head: NeedleHead;
    private line: egret.Sprite;

    public constructor() {
        super();
        this.width = 22;
        this.height = 150;
        this.anchorOffsetX = 0;
        this.anchorOffsetY = 150;

        this.initView();
    }

    private initView(): void {
        this.head = new NeedleHead();
        this.addChild(this.head);

        this.line = new egret.Sprite();
        this.addChild(this.line);

        var graphics: egret.Graphics = this.line.graphics;
        graphics.beginFill(0x000000, 1);
        graphics.drawRect(0, 0, 1, this.height);
        graphics.endFill();
        this.line.x = 0;
        this.line.y = 0;

    }

    public setRotation(value: number): void {
        this.rotation = value;
    }

    public getHitBox(): egret.Rectangle {
        if (this.head) {
             var pos: egret.Point = this.localToGlobal(this.head.x, this.head.y);
            return new egret.Rectangle(pos.x, pos.y, this.head.width, this.head.height);
        }
        else {
            return null;
        }
    }

    
    public dispose(): void {
        this.graphics.clear();
        if (this.head) {
            this.head.dispose();
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }
} 