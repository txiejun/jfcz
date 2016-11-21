class CircleLayout extends BaseLayout{
	//半径 因为X Y 方向半径都是一样的 
	//为了让这个变量可以让椭圆使用 所以使用 radiusX 好和 radiusY对应
	public radiusX:number;
		
	public constructor(centerPoint:egret.Point, groupEls:Array<any>, startAngle:number, radius:number){
		super();
		this.centerPoint = centerPoint
		this.layoutEls   = groupEls;
		this.startAngle = startAngle;
		this.radiusX = radius;
	}

	public layout():void{
		var len:number=this.layoutEls.length
		this.disAngle=360 / len;
		for (var i:number=0; i < len; i++){
			var tempRaian:number=this.startAngle * Math.PI / 180;
            var node: egret.DisplayObject = <egret.DisplayObject><any> (this.layoutEls[i]);
			node.x=this.centerPoint.x + Math.cos(tempRaian) * this.radiusX;
			node.y=this.centerPoint.y + Math.sin(tempRaian) * this.radiusX;
			//角度增加
			this.startAngle+=this.disAngle;
		}
	}
}
