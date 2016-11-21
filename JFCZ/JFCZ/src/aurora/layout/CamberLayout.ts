class CamberLayout extends EllipseLayout{
	//分布范围 如果90那么就是指从startAngle 开始到angelRange 这样以一个范围
	public angelRange:number;

    public constructor(centerPoint:egret.Point, groupEls:Array<any>, startAngle:number, radiusX:number, radiusY:number, angelRange:number){
		this.type="CamberLayout";
		super(centerPoint, groupEls, startAngle, radiusX, radiusY);
		this.angelRange=angelRange;
	}

	public layout():void{
		var len:number=this.layoutEls.length;
		this.disAngle=this.angelRange / len;
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
