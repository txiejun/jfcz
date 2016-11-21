class MathUtil{
	public constructor(){
	}
		
	/**
		* 获得一个 范围内的 随机整数 
		* @param min
		* @param max
		* @return 
		* 
		*/		
	public static random(min:number, max:number = 0):number{
		return Math.round(Math.random() * (max - min)) + min;
	}
		
	/**
		* 通过角度获得弧度 
		* @param angle
		* @return 
		* 
		*/		
	public static getRadian(angle:number):number{
		return angle * Math.PI / 180;
	}
		
	/**
		* 通过弧度获得角度 
		* @param radian
		* @return 
		* 
		*/		
	public static getAngle(radian:number):number{
		return radian * 180 / Math.PI;
	}
		
	/**
		* 获得两点之间的弧度 
		* @param pos 起点
		* @param dest 终点
		* @return 
		* 
		*/		
	public static getRadianByLine(pos:egret.Point, dest:egret.Point):number{
		var result:number = 0;
		if(pos && dest){
			result = Math.atan2(dest.y - pos.y, dest.x - pos.x);
		}
		return result;
	}
		
	/**
		* 获得两点之间的角度 
		* @param pos 起点
		* @param dest 终点
		* @return 
		* 
		*/		
	public static getAngleByLine(pos:egret.Point, dest:egret.Point):number{
		return MathUtil.getAngle(MathUtil.getRadianByLine(pos, dest));
	}
}
