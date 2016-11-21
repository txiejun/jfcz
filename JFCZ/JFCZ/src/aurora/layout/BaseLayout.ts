class BaseLayout{
	//布局的类型 
	public type:string ;
		
	//要布局的对象数据数组
	public layoutEls:Array<any>;
		
	//布局中心点位置
	public centerPoint:egret.Point;
		
	//分布开始角度 默认0度开始分布
	public startAngle:number = 0 ;
		
	//每个元素之间的角度间隙
	//通过计算得到
	public disAngle:number ; 
		
	public constructor(){
	}
		
	public layout():void{
			
	}
}
