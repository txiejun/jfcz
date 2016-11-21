//抛出的针
class ThrowNeedle extends NeedleHead {

    private txtNum: egret.TextField;

    public constructor() {
        super();
        this.initView2();
    }

    private initView2(): void {
        this.txtNum = new egret.TextField();
        this.addChild(this.txtNum);
        this.txtNum.x = -(this.width / 2);
        this.txtNum.y = -(this.height / 2);
        this.txtNum.width = this.width;
        this.txtNum.height = this.height;
        this.txtNum.size = 12;
        this.txtNum.textAlign = egret.HorizontalAlign.CENTER;
        this.txtNum.verticalAlign = egret.VerticalAlign.MIDDLE;

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
        super.dispose();
        if (this.txtNum) {
            this.txtNum.text = "";
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }
}
 