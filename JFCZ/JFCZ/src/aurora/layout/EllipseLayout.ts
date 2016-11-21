class EllipseLayout extends CircleLayout{
	//Y方向半径
	public radiusY:number;

    public constructor(centerPoint:egret.Point, groupEls:Array<any>, startAngle:number, radiusX:number, radiusY:number){
		super(centerPoint, groupEls, startAngle, radiusX);
		this.radiusY=radiusY;
	}

	//布局算法 基本和圆形一样
	public layout():void{
		var len:number=this.layoutEls.length;
		this.disAngle=360 / len;
		for (var i:number=0; i < len; i++){
			var tempRaian:number=this.startAngle * Math.PI / 180;
            var node: egret.DisplayObject = <egret.DisplayObject><any> (this.layoutEls[i]);
			node.x=this.centerPoint.x + Math.cos(tempRaian) * this.radiusX;
			node.y=this.centerPoint.y + Math.sin(tempRaian) * this.radiusY;
			//角度增加
			this.startAngle+=this.disAngle;
		}
	}
}
