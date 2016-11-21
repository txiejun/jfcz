//圆盘
class Disc extends egret.Sprite {

    private txtNum: egret.TextField;

    public constructor() {
        super();
        this.width = 100;
        this.height = 100;

        this.initView();
    }

    private initView(): void {
        this.graphics.beginFill(0x000000, 1);
        this.graphics.drawCircle(0, 0, this.width/2);
        this.graphics.endFill();

        this.txtNum = new egret.TextField();
        this.addChild(this.txtNum);
        this.txtNum.x = -(this.width/2) ;
        this.txtNum.y = -(this.height/2);
        this.txtNum.width = this.width;
        this.txtNum.height = this.height;
        this.txtNum.size = 50;
        this.txtNum.textAlign = egret.HorizontalAlign.CENTER;
        this.txtNum.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.txtNum.bold = true;
    }

    /**
      * 设置数字
      * @param value 
      */
    public setNum(value: number): void {
        if (this.txtNum) {
            this.txtNum.text = value.toString();
        }
    }

    public dispose(): void {
        this.graphics.clear();
        if (this.txtNum) {
            this.txtNum.text = "";
        }
    }

}
 