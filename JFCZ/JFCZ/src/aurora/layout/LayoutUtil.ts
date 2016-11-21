class LayoutUtil{
	public constructor(){
	}
	
	/**
		* 垂直布局
		*/
	public static layoutVectical(container:egret.DisplayObjectContainer, vpadding:number=0, startY:number=0):void{
		if (!container)
			return;
		var size:number=container.numChildren;
		if (size == 0)
			return;
		var y:number=startY;
		for (var i:number=0; i < size; i++){
            var child:egret.DisplayObject=container.getChildAt(i);
			child.y=y;
			y=child.height + child.y + vpadding;
		}
	}
		
	/**
		* 水平布局
		* @param container 容易
		* @param hpadding 间隔
		* @param startX 起始坐标
		* @param $isNeedWidth 是否在间隔上再加上子类的宽度 true为加上
		*/
    public static layoutHorizontal(container:egret.DisplayObjectContainer, hpadding:number=0, startX:number=0 ,$isNeedWidth:boolean = true):void{
		if (!container)
			return;
		var size:number=container.numChildren;
		if (size == 0)
			return;
		var x:number=startX;
		for (var i:number=0; i < size; i++){
            var child:egret.DisplayObject=container.getChildAt(i);
			child.x=x;
			if($isNeedWidth){
				x = child.width + child.x + hpadding;
			}
			else{
				x = child.x + hpadding;
			}
		}
	}
		
	/**
		* 网格布局
		* @param container
		* @param columnCount
		* @param hPadding
		* @param vPadding
		* @param offsetX
		* @param $isAddition	是否需要计算原始宽度
		* 	true	计算原始宽度
		* 	false	不计算原始宽度
		* @param $isAdditionHeight	是否需要计算原始高度
		* 	true	计算原始高度
		* 	false	不计算原始高度
		*/
    public static layoutGrid(container:egret.DisplayObjectContainer, columnCount:number, hPadding:number, vPadding:number, offsetX:number = 0, $isAdditionWidth:boolean = true, $isAdditionHeight:boolean = true):void{
		if (!container)
			return;
		var size:number=container.numChildren;
		if (size == 0)
			return;
		for (var i:number = 0; i < size; i++){
            var child:egret.DisplayObject=container.getChildAt(i);
			var row:number=i / columnCount;
			var column:number=i % columnCount;
			child.x=($isAdditionWidth ? (column * child.width) : 0) + column * hPadding + row * offsetX;
			child.y=($isAdditionHeight ? (row * child.height) : 0) + row * vPadding;
		}
	}
		
	/**
		* 椭圆布局
		*
		*/
    public static layoutEllipse(container: egret.DisplayObjectContainer, centerPoint:egret.Point, radiusX:number, radiusY:number, startAngle:number=0):void{
		if (!container)
			return;
		var size:number=container.numChildren;
		if (size == 0)
			return;
		var elements:Array<any>=[];
		for (var i:number = 0; i < size; i++){
			elements.push(container.getChildAt(i));
		}
		var layout:EllipseLayout=new EllipseLayout(centerPoint, elements, startAngle, radiusX, radiusY);
		layout.layout();
	}
		
	/**
		* 圆形布局
		*
		*/
    public static layoutCircle(container: egret.DisplayObjectContainer, centerPoint:egret.Point, radius:number, startAngle:number=0):void{
		if (!container)
			return;
		var size:number=container.numChildren;
		if (size == 0)
			return;
		var elements:Array<any>=[];
		for (var i:number = 0; i < size; i++){
			elements.push(container.getChildAt(i));
		}
		var layout:CircleLayout=new CircleLayout(centerPoint, elements, startAngle, radius);
		layout.layout();
	}
		
	/**
		* 扇形布局
		*
		*/
    public static layoutCamber(container: egret.DisplayObjectContainer, centerPoint:egret.Point, radiusX:number, radiusY:number, startAngle:number=0, angleRange:number=180):void{
		if (!container)
			return;
		var size:number=container.numChildren;
		if (size == 0)
			return;
		var elements:Array<any>=[];
		for (var i:number = 0; i < size; i++){
			elements.push(container.getChildAt(i));
		}
		var layout:CamberLayout=new CamberLayout(centerPoint, elements, startAngle, radiusX, radiusY, angleRange);
		layout.layout();
	}
		
}
